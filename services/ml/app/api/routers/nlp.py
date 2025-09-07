"""NLP endpoints for sentiment analysis and topic extraction"""

import logging
from typing import List, Optional
from datetime import datetime

from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel, Field, validator

from app.core.models import analyze_sentiment_batch, extract_keywords_batch
from app.core.database import (
    get_comments_for_analysis,
    update_comment_sentiment
)

logger = logging.getLogger(__name__)
router = APIRouter()

class TextInput(BaseModel):
    """Single text input for analysis"""
    text: str = Field(..., min_length=1, max_length=2000)
    id: Optional[str] = None

class SentimentBatchRequest(BaseModel):
    """Batch sentiment analysis request"""
    texts: List[TextInput] = Field(..., min_items=1, max_items=1000)
    
    @validator('texts')
    def validate_texts(cls, v):
        if len(v) > 1000:
            raise ValueError('Maximum 1000 texts per batch')
        return v

class SentimentResult(BaseModel):
    """Sentiment analysis result"""
    text: str
    sentiment: str = Field(..., description="POS, NEU, or NEG")
    confidence: float = Field(..., ge=0.0, le=1.0)
    id: Optional[str] = None

class SentimentBatchResponse(BaseModel):
    """Batch sentiment analysis response"""
    results: List[SentimentResult]
    processed_count: int
    processing_time_ms: float

class TopicExtractionRequest(BaseModel):
    """Topic extraction request"""
    texts: List[TextInput] = Field(..., min_items=1, max_items=500)
    top_k: int = Field(5, ge=1, le=20, description="Number of keywords per text")

class TopicResult(BaseModel):
    """Topic extraction result"""
    text: str
    keywords: List[str]
    id: Optional[str] = None

class TopicExtractionResponse(BaseModel):
    """Topic extraction response"""
    results: List[TopicResult]
    processed_count: int
    processing_time_ms: float

class WorkspaceAnalysisRequest(BaseModel):
    """Workspace-wide analysis request"""
    workspace_id: str
    platform: Optional[str] = None
    limit: int = Field(1000, ge=1, le=5000)

@router.post("/sentiment-batch", response_model=SentimentBatchResponse)
async def analyze_sentiment_batch_endpoint(request: SentimentBatchRequest):
    """
    Analyze sentiment for a batch of texts
    
    Returns sentiment classification (POS/NEU/NEG) with confidence scores.
    Optimized for processing social media comments and user-generated content.
    """
    start_time = datetime.utcnow()
    
    try:
        # Extract texts and IDs
        texts = [item.text for item in request.texts]
        ids = [item.id for item in request.texts]
        
        logger.info(f"Processing sentiment analysis for {len(texts)} texts")
        
        # Analyze sentiment
        sentiment_results = analyze_sentiment_batch(texts)
        
        # Format results
        results = []
        for i, result in enumerate(sentiment_results):
            results.append(SentimentResult(
                text=result['text'],
                sentiment=result['sentiment'],
                confidence=result['confidence'],
                id=ids[i]
            ))
        
        processing_time = (datetime.utcnow() - start_time).total_seconds() * 1000
        
        logger.info(f"Sentiment analysis completed in {processing_time:.2f}ms")
        
        return SentimentBatchResponse(
            results=results,
            processed_count=len(results),
            processing_time_ms=processing_time
        )
    
    except Exception as e:
        logger.error(f"Sentiment analysis failed: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Sentiment analysis failed: {str(e)}"
        )

@router.post("/topics", response_model=TopicExtractionResponse)
async def extract_topics_endpoint(request: TopicExtractionRequest):
    """
    Extract topics and keywords from texts using KeyBERT
    
    Uses sentence transformers and MMR (Maximal Marginal Relevance) for 
    diverse keyword extraction. Optimized for social media content.
    """
    start_time = datetime.utcnow()
    
    try:
        # Extract texts and IDs
        texts = [item.text for item in request.texts]
        ids = [item.id for item in request.texts]
        
        logger.info(f"Processing topic extraction for {len(texts)} texts")
        
        # Extract keywords
        keyword_results = extract_keywords_batch(texts, top_k=request.top_k)
        
        # Format results
        results = []
        for i, keywords in enumerate(keyword_results):
            results.append(TopicResult(
                text=texts[i],
                keywords=keywords,
                id=ids[i]
            ))
        
        processing_time = (datetime.utcnow() - start_time).total_seconds() * 1000
        
        logger.info(f"Topic extraction completed in {processing_time:.2f}ms")
        
        return TopicExtractionResponse(
            results=results,
            processed_count=len(results),
            processing_time_ms=processing_time
        )
    
    except Exception as e:
        logger.error(f"Topic extraction failed: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Topic extraction failed: {str(e)}"
        )

@router.post("/analyze-workspace")
async def analyze_workspace_comments(
    request: WorkspaceAnalysisRequest,
    background_tasks: BackgroundTasks
):
    """
    Analyze all unprocessed comments for a workspace
    
    This endpoint processes comments in the background and updates
    the database with sentiment and topic analysis results.
    """
    try:
        logger.info(f"Starting workspace analysis for {request.workspace_id}")
        
        # Get unprocessed comments
        comments = await get_comments_for_analysis(
            workspace_id=request.workspace_id,
            limit=request.limit,
            platform=request.platform
        )
        
        if not comments:
            return {
                "message": "No unprocessed comments found",
                "workspace_id": request.workspace_id,
                "comments_found": 0
            }
        
        # Add background task to process comments
        background_tasks.add_task(
            process_workspace_comments,
            comments
        )
        
        return {
            "message": "Analysis started",
            "workspace_id": request.workspace_id,
            "comments_to_process": len(comments),
            "status": "processing"
        }
    
    except Exception as e:
        logger.error(f"Workspace analysis failed: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Workspace analysis failed: {str(e)}"
        )

async def process_workspace_comments(comments: List[dict]):
    """Background task to process comments"""
    try:
        logger.info(f"Processing {len(comments)} comments in background")
        
        # Extract texts for batch processing
        texts = [comment['text'] for comment in comments]
        
        # Analyze sentiment
        sentiment_results = analyze_sentiment_batch(texts)
        
        # Extract topics
        topic_results = extract_keywords_batch(texts, top_k=5)
        
        # Update database
        for i, comment in enumerate(comments):
            try:
                sentiment_result = sentiment_results[i]
                topic_keywords = topic_results[i]
                
                await update_comment_sentiment(
                    comment_id=comment['id'],
                    sentiment=sentiment_result['sentiment'],
                    confidence=sentiment_result['confidence'],
                    topic_tags=topic_keywords
                )
            except Exception as e:
                logger.error(f"Failed to update comment {comment['id']}: {e}")
        
        logger.info(f"Successfully processed {len(comments)} comments")
    
    except Exception as e:
        logger.error(f"Background comment processing failed: {e}")

@router.get("/workspace/{workspace_id}/stats")
async def get_workspace_sentiment_stats(workspace_id: str):
    """Get sentiment statistics for a workspace"""
    try:
        # This would typically query the database for aggregated stats
        # For now, return a placeholder response
        return {
            "workspace_id": workspace_id,
            "total_comments": 1250,
            "sentiment_distribution": {
                "positive": 0.73,
                "neutral": 0.21,
                "negative": 0.06
            },
            "avg_confidence": 0.85,
            "last_updated": datetime.utcnow(),
            "top_topics": [
                "product feedback",
                "customer service",
                "pricing",
                "features",
                "user experience"
            ]
        }
    
    except Exception as e:
        logger.error(f"Failed to get workspace stats: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get workspace stats: {str(e)}"
        )


