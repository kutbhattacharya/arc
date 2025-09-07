import { SetMetadata } from '@nestjs/common'

export const RATE_LIMIT_TTL_KEY = 'rateLimitTtl'
export const RATE_LIMIT_LIMIT_KEY = 'rateLimitLimit'

export const RateLimit = (ttl: number, limit: number) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    SetMetadata(RATE_LIMIT_TTL_KEY, ttl)(target, propertyKey, descriptor)
    SetMetadata(RATE_LIMIT_LIMIT_KEY, limit)(target, propertyKey, descriptor)
  }
}
