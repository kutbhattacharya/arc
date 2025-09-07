import { PrismaClient } from '@prisma/client'
import { multiTenantMiddleware, auditMiddleware, validationMiddleware } from '../prisma/middleware'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'error', 'warn'],
})

// Add middleware
prisma.$use(multiTenantMiddleware)
prisma.$use(auditMiddleware)
prisma.$use(validationMiddleware)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma