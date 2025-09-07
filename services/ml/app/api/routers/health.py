"""Health check endpoints for the ML service"""

import logging
import asyncio
from datetime import datetime
from typing import Dict, Any

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.core.database import get_db_connection
from app.core.models import model_manager
from app.core.config import get_settings

logger = logging.getLogger(__name__)
router = APIRouter()

class HealthResponse(BaseModel):
    """Health check response model"""
    status: str
    timestamp: datetime
    version: str
    environment: str
    checks: Dict[str, Any]

@router.get("/", response_model=HealthResponse)
async def health_check():
    """Comprehensive health check"""
    settings = get_settings()
    checks = {}
    overall_status = "healthy"
    
    # Check database connection
    try:
        async with get_db_connection() as conn:
            result = await conn.fetchval("SELECT 1")
            checks["database"] = {
                "status": "healthy" if result == 1 else "unhealthy",
                "response_time_ms": 0  # Could add timing here
            }
    except Exception as e:
        checks["database"] = {
            "status": "unhealthy",
            "error": str(e)
        }
        overall_status = "unhealthy"
    
    # Check ML models
    try:
        sentiment_model = model_manager.get_model('sentiment')
        embedding_model = model_manager.get_model('embeddings')
        keybert_model = model_manager.get_model('keybert')
        
        checks["models"] = {
            "status": "healthy",
            "loaded_models": {
                "sentiment": sentiment_model is not None,
                "embeddings": embedding_model is not None,
                "keybert": keybert_model is not None
            }
        }
    except Exception as e:
        checks["models"] = {
            "status": "unhealthy",
            "error": str(e)
        }
        overall_status = "unhealthy"
    
    # System resources
    import psutil
    checks["system"] = {
        "status": "healthy",
        "cpu_percent": psutil.cpu_percent(),
        "memory_percent": psutil.virtual_memory().percent,
        "disk_percent": psutil.disk_usage('/').percent
    }
    
    return HealthResponse(
        status=overall_status,
        timestamp=datetime.utcnow(),
        version="1.0.0",
        environment=settings.environment,
        checks=checks
    )

@router.get("/ready")
async def readiness_check():
    """Kubernetes-style readiness check"""
    try:
        # Check if models are loaded
        model_manager.get_model('sentiment')
        model_manager.get_model('embeddings')
        model_manager.get_model('keybert')
        
        # Check database
        async with get_db_connection() as conn:
            await conn.fetchval("SELECT 1")
        
        return {"status": "ready"}
    except Exception as e:
        logger.error(f"Readiness check failed: {e}")
        raise HTTPException(status_code=503, detail="Service not ready")

@router.get("/live")
async def liveness_check():
    """Kubernetes-style liveness check"""
    return {"status": "alive", "timestamp": datetime.utcnow()}

@router.get("/metrics")
async def metrics():
    """Basic metrics endpoint"""
    try:
        # This could be expanded with Prometheus metrics
        import psutil
        
        return {
            "system": {
                "cpu_percent": psutil.cpu_percent(interval=1),
                "memory": {
                    "percent": psutil.virtual_memory().percent,
                    "available_gb": psutil.virtual_memory().available / (1024**3)
                },
                "disk": {
                    "percent": psutil.disk_usage('/').percent,
                    "free_gb": psutil.disk_usage('/').free / (1024**3)
                }
            },
            "models": {
                "sentiment_loaded": "sentiment" in model_manager.models,
                "embeddings_loaded": "embeddings" in model_manager.models,
                "keybert_loaded": "keybert" in model_manager.models
            }
        }
    except Exception as e:
        logger.error(f"Metrics collection failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to collect metrics")


