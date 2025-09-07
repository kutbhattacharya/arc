"""ML model management and caching"""

import os
import logging
from typing import Dict, Any, Optional
import asyncio
from pathlib import Path

import torch
import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline
from sentence_transformers import SentenceTransformer
from keybert import KeyBERT
import nltk

from app.core.config import get_settings

logger = logging.getLogger(__name__)

class ModelManager:
    """Centralized model management"""
    
    def __init__(self):
        self.settings = get_settings()
        self.models: Dict[str, Any] = {}
        self.tokenizers: Dict[str, Any] = {}
        
        # Create model cache directory
        Path(self.settings.model_cache_dir).mkdir(parents=True, exist_ok=True)
    
    async def download_models(self) -> None:
        """Download and cache all required models"""
        logger.info("Downloading ML models...")
        
        try:
            # Download NLTK data
            await self._download_nltk_data()
            
            # Load sentiment analysis model
            await self._load_sentiment_model()
            
            # Load embedding model for KeyBERT
            await self._load_embedding_model()
            
            # Initialize KeyBERT
            await self._load_keybert()
            
            logger.info("✅ All models loaded successfully")
            
        except Exception as e:
            logger.error(f"❌ Failed to load models: {e}")
            raise
    
    async def _download_nltk_data(self) -> None:
        """Download required NLTK data"""
        logger.info("Downloading NLTK data...")
        
        nltk_data = ['punkt', 'stopwords', 'vader_lexicon']
        
        for data in nltk_data:
            try:
                nltk.data.find(f'tokenizers/{data}')
            except LookupError:
                logger.info(f"Downloading NLTK {data}...")
                nltk.download(data, quiet=True)
    
    async def _load_sentiment_model(self) -> None:
        """Load sentiment analysis model"""
        logger.info("Loading sentiment model...")
        
        model_name = self.settings.sentiment_model
        cache_dir = os.path.join(self.settings.model_cache_dir, "sentiment")
        
        # Load tokenizer and model
        tokenizer = AutoTokenizer.from_pretrained(
            model_name,
            cache_dir=cache_dir
        )
        model = AutoModelForSequenceClassification.from_pretrained(
            model_name,
            cache_dir=cache_dir
        )
        
        # Create pipeline
        sentiment_pipeline = pipeline(
            "sentiment-analysis",
            model=model,
            tokenizer=tokenizer,
            device=0 if torch.cuda.is_available() else -1,
            return_all_scores=True
        )
        
        self.models['sentiment'] = sentiment_pipeline
        self.tokenizers['sentiment'] = tokenizer
        
        logger.info("✅ Sentiment model loaded")
    
    async def _load_embedding_model(self) -> None:
        """Load sentence embedding model"""
        logger.info("Loading embedding model...")
        
        model_name = self.settings.embedding_model
        cache_dir = os.path.join(self.settings.model_cache_dir, "embeddings")
        
        model = SentenceTransformer(
            model_name,
            cache_folder=cache_dir
        )
        
        self.models['embeddings'] = model
        
        logger.info("✅ Embedding model loaded")
    
    async def _load_keybert(self) -> None:
        """Initialize KeyBERT for keyword extraction"""
        logger.info("Initializing KeyBERT...")
        
        embedding_model = self.models['embeddings']
        keybert = KeyBERT(model=embedding_model)
        
        self.models['keybert'] = keybert
        
        logger.info("✅ KeyBERT initialized")
    
    def get_model(self, model_name: str) -> Any:
        """Get a loaded model"""
        if model_name not in self.models:
            raise ValueError(f"Model {model_name} not loaded")
        return self.models[model_name]
    
    def get_tokenizer(self, model_name: str) -> Any:
        """Get a loaded tokenizer"""
        if model_name not in self.tokenizers:
            raise ValueError(f"Tokenizer {model_name} not loaded")
        return self.tokenizers[model_name]

# Global model manager
model_manager = ModelManager()

async def download_models() -> None:
    """Download and initialize all models"""
    await model_manager.download_models()

def get_sentiment_model():
    """Get the sentiment analysis model"""
    return model_manager.get_model('sentiment')

def get_embedding_model():
    """Get the sentence embedding model"""
    return model_manager.get_model('embeddings')

def get_keybert_model():
    """Get the KeyBERT model"""
    return model_manager.get_model('keybert')

def analyze_sentiment_batch(texts: list[str]) -> list[dict]:
    """Analyze sentiment for a batch of texts"""
    if not texts:
        return []
    
    try:
        sentiment_model = get_sentiment_model()
        
        # Process texts in batches to avoid memory issues
        max_batch_size = model_manager.settings.max_batch_size
        results = []
        
        for i in range(0, len(texts), max_batch_size):
            batch = texts[i:i + max_batch_size]
            
            # Truncate texts if needed
            truncated_batch = [
                text[:model_manager.settings.max_text_length] 
                for text in batch
            ]
            
            batch_results = sentiment_model(truncated_batch)
            
            # Process results
            for j, text_results in enumerate(batch_results):
                # Find the highest confidence prediction
                best_prediction = max(text_results, key=lambda x: x['score'])
                
                # Map model labels to our format
                label_mapping = {
                    'LABEL_0': 'NEG',  # Negative
                    'LABEL_1': 'NEU',  # Neutral  
                    'LABEL_2': 'POS',  # Positive
                    'NEGATIVE': 'NEG',
                    'NEUTRAL': 'NEU',
                    'POSITIVE': 'POS'
                }
                
                sentiment = label_mapping.get(
                    best_prediction['label'].upper(), 
                    'NEU'
                )
                
                results.append({
                    'text': batch[j],
                    'sentiment': sentiment,
                    'confidence': best_prediction['score'],
                    'all_scores': text_results
                })
        
        return results
        
    except Exception as e:
        logger.error(f"Error in sentiment analysis: {e}")
        # Return neutral sentiment for all texts on error
        return [
            {
                'text': text,
                'sentiment': 'NEU',
                'confidence': 0.0,
                'all_scores': [],
                'error': str(e)
            }
            for text in texts
        ]

def extract_keywords_batch(texts: list[str], top_k: int = 5) -> list[list[str]]:
    """Extract keywords from a batch of texts"""
    if not texts:
        return []
    
    try:
        keybert_model = get_keybert_model()
        
        results = []
        for text in texts:
            if len(text.strip()) < 10:  # Skip very short texts
                results.append([])
                continue
            
            # Extract keywords
            keywords = keybert_model.extract_keywords(
                text,
                keyphrase_ngram_range=(1, 2),
                stop_words='english',
                top_k=top_k,
                use_mmr=True,
                diversity=0.5
            )
            
            # Extract just the keyword strings
            keyword_list = [kw[0] for kw in keywords]
            results.append(keyword_list)
        
        return results
        
    except Exception as e:
        logger.error(f"Error in keyword extraction: {e}")
        return [[] for _ in texts]


