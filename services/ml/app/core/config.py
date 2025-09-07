"""Configuration settings for the ML service"""

import os
from functools import lru_cache
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """Application settings"""
    
    # Environment
    environment: str = os.getenv("ENVIRONMENT", "development")
    
    # Database
    database_url: str = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/rust")
    
    # Redis
    redis_url: str = os.getenv("REDIS_URL", "redis://localhost:6379")
    
    # API Configuration
    api_host: str = os.getenv("API_HOST", "0.0.0.0")
    api_port: int = int(os.getenv("API_PORT", "8000"))
    
    # ML Model Settings
    model_cache_dir: str = os.getenv("MODEL_CACHE_DIR", "./models")
    sentiment_model: str = os.getenv("SENTIMENT_MODEL", "cardiffnlp/twitter-roberta-base-sentiment-latest")
    embedding_model: str = os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2")
    
    # Processing limits
    max_batch_size: int = int(os.getenv("MAX_BATCH_SIZE", "1000"))
    max_text_length: int = int(os.getenv("MAX_TEXT_LENGTH", "512"))
    
    # Rate limiting
    rate_limit_requests: int = int(os.getenv("RATE_LIMIT_REQUESTS", "100"))
    rate_limit_window: int = int(os.getenv("RATE_LIMIT_WINDOW", "60"))
    
    # Logging
    log_level: str = os.getenv("LOG_LEVEL", "INFO")
    log_format: str = os.getenv("LOG_FORMAT", "json")
    
    # Security
    allowed_origins: list[str] = [
        "http://localhost:3000",
        "http://localhost:4000",
        "https://rust.app",
        "https://api.rust.app"
    ]
    
    class Config:
        case_sensitive = False
        env_file = ".env"

@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()


