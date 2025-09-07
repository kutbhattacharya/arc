/**
 * Arc Ingest Worker
 * 
 * Background worker for scheduled data pulls from various platforms
 * using BullMQ for job queuing and Redis for persistence.
 */

import 'dotenv/config'
import { Worker, Queue } from 'bullmq'
import { createLogger } from './lib/logger'
import { createRedisConnection } from './lib/redis'
import { YouTubeIngestJob } from './jobs/youtube-ingest'
import { InstagramIngestJob } from './jobs/instagram-ingest'
import { GoogleAdsIngestJob } from './jobs/google-ads-ingest'
import { MetaAdsIngestJob } from './jobs/meta-ads-ingest'

const logger = createLogger('ingest-worker')

// Queue names
export const QUEUE_NAMES = {
  YOUTUBE: 'ingest.youtube',
  INSTAGRAM: 'ingest.instagram',
  GOOGLE_ADS: 'ingest.ads.google',
  META_ADS: 'ingest.ads.meta',
} as const

// Create Redis connection
const redisConnection = createRedisConnection()

// Create queues
const queues = {
  youtube: new Queue(QUEUE_NAMES.YOUTUBE, { connection: redisConnection }),
  instagram: new Queue(QUEUE_NAMES.INSTAGRAM, { connection: redisConnection }),
  googleAds: new Queue(QUEUE_NAMES.GOOGLE_ADS, { connection: redisConnection }),
  metaAds: new Queue(QUEUE_NAMES.META_ADS, { connection: redisConnection }),
}

// Create workers
const workers = {
  youtube: new Worker(QUEUE_NAMES.YOUTUBE, YouTubeIngestJob.process, {
    connection: redisConnection,
    concurrency: 2,
  }),
  instagram: new Worker(QUEUE_NAMES.INSTAGRAM, InstagramIngestJob.process, {
    connection: redisConnection,
    concurrency: 1,
  }),
  googleAds: new Worker(QUEUE_NAMES.GOOGLE_ADS, GoogleAdsIngestJob.process, {
    connection: redisConnection,
    concurrency: 1,
  }),
  metaAds: new Worker(QUEUE_NAMES.META_ADS, MetaAdsIngestJob.process, {
    connection: redisConnection,
    concurrency: 1,
  }),
}

// Worker event handlers
Object.entries(workers).forEach(([name, worker]) => {
  worker.on('completed', (job) => {
    logger.info(`Job completed: ${name}`, { jobId: job.id })
  })

  worker.on('failed', (job, err) => {
    logger.error(`Job failed: ${name}`, { jobId: job?.id, error: err.message })
  })

  worker.on('error', (err) => {
    logger.error(`Worker error: ${name}`, { error: err.message })
  })
})

// Graceful shutdown
process.on('SIGINT', async () => {
  logger.info('Shutting down ingest workers...')
  
  await Promise.all([
    ...Object.values(workers).map(worker => worker.close()),
    ...Object.values(queues).map(queue => queue.close()),
  ])
  
  await redisConnection.quit()
  process.exit(0)
})

logger.info('🚀 Arc Ingest Worker started')
logger.info('Queues:', Object.keys(queues))
logger.info('Workers:', Object.keys(workers))

// Export queues for external use
export { queues }

