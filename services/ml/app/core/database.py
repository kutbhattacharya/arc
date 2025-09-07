"""Database connection utilities for the ML service"""

import asyncio
import logging
from contextlib import asynccontextmanager
from typing import AsyncGenerator, Optional

import asyncpg
from app.core.config import get_settings

logger = logging.getLogger(__name__)

class DatabasePool:
    """Database connection pool manager"""
    
    def __init__(self):
        self._pool: Optional[asyncpg.Pool] = None
        self._settings = get_settings()
    
    async def initialize(self) -> None:
        """Initialize the connection pool"""
        if self._pool is None:
            try:
                self._pool = await asyncpg.create_pool(
                    self._settings.database_url,
                    min_size=1,
                    max_size=10,
                    command_timeout=60,
                    server_settings={
                        'jit': 'off',
                        'application_name': 'rust_ml_service'
                    }
                )
                logger.info("Database pool initialized")
            except Exception as e:
                logger.error(f"Failed to initialize database pool: {e}")
                raise
    
    async def close(self) -> None:
        """Close the connection pool"""
        if self._pool:
            await self._pool.close()
            self._pool = None
            logger.info("Database pool closed")
    
    @asynccontextmanager
    async def get_connection(self) -> AsyncGenerator[asyncpg.Connection, None]:
        """Get a database connection from the pool"""
        if not self._pool:
            await self.initialize()
        
        async with self._pool.acquire() as connection:
            yield connection

# Global pool instance
_db_pool = DatabasePool()

async def get_db_connection() -> AsyncGenerator[asyncpg.Connection, None]:
    """Get a database connection (dependency injection)"""
    async with _db_pool.get_connection() as conn:
        yield conn

async def initialize_db() -> None:
    """Initialize database connection pool"""
    await _db_pool.initialize()

async def close_db() -> None:
    """Close database connection pool"""
    await _db_pool.close()

async def execute_query(
    query: str, 
    *args, 
    fetch_one: bool = False,
    fetch_all: bool = False
):
    """Execute a database query with connection management"""
    async with get_db_connection() as conn:
        if fetch_one:
            return await conn.fetchrow(query, *args)
        elif fetch_all:
            return await conn.fetch(query, *args)
        else:
            return await conn.execute(query, *args)

async def get_comments_for_analysis(
    workspace_id: str,
    limit: int = 1000,
    platform: Optional[str] = None
) -> list[dict]:
    """Get comments for sentiment analysis"""
    query = """
        SELECT c.id, c.text, c.platform, c.content_item_id, ci.channel_id
        FROM comments c
        JOIN content_items ci ON c.content_item_id = ci.id
        JOIN channels ch ON ci.channel_id = ch.id
        WHERE ch.workspace_id = $1
        AND c.sentiment IS NULL
        AND LENGTH(c.text) > 10
    """
    
    params = [workspace_id]
    
    if platform:
        query += " AND c.platform = $2"
        params.append(platform)
    
    query += " ORDER BY c.created_at DESC LIMIT $" + str(len(params) + 1)
    params.append(limit)
    
    async with get_db_connection() as conn:
        rows = await conn.fetch(query, *params)
        return [dict(row) for row in rows]

async def update_comment_sentiment(
    comment_id: str,
    sentiment: str,
    confidence: float,
    topic_tags: list[str]
) -> None:
    """Update comment with sentiment analysis results"""
    query = """
        UPDATE comments 
        SET sentiment = $2, topic_tags = $3, meta_json = $4, updated_at = NOW()
        WHERE id = $1
    """
    
    meta_json = {
        "sentiment_confidence": confidence,
        "processed_at": asyncio.get_event_loop().time(),
        "ml_version": "1.0.0"
    }
    
    async with get_db_connection() as conn:
        await conn.execute(query, comment_id, sentiment, topic_tags, meta_json)

async def get_trending_topics(
    workspace_id: str,
    days: int = 7,
    limit: int = 50
) -> list[dict]:
    """Get trending topics for the workspace"""
    query = """
        SELECT 
            tag,
            COUNT(*) as mention_count,
            AVG(CASE 
                WHEN sentiment = 'POS' THEN 1 
                WHEN sentiment = 'NEU' THEN 0 
                ELSE -1 
            END) as avg_sentiment,
            COUNT(*) FILTER (WHERE c.created_at > NOW() - INTERVAL '%s days') as recent_mentions
        FROM comments c
        JOIN content_items ci ON c.content_item_id = ci.id
        JOIN channels ch ON ci.channel_id = ch.id,
        UNNEST(c.topic_tags) as tag
        WHERE ch.workspace_id = $1
        AND c.created_at > NOW() - INTERVAL '%s days'
        GROUP BY tag
        HAVING COUNT(*) >= 5
        ORDER BY recent_mentions DESC, mention_count DESC
        LIMIT $2
    """ % (days, days)
    
    async with get_db_connection() as conn:
        rows = await conn.fetch(query, workspace_id, limit)
        return [dict(row) for row in rows]


