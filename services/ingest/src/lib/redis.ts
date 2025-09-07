import { Redis } from 'ioredis'

export function createRedisConnection(): Redis {
  const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'
  
  return new Redis(redisUrl, {
    enableReadyCheck: false,
    maxRetriesPerRequest: null,
    lazyConnect: true,
  })
}
