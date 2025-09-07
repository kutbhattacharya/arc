import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

export interface AuditLogData {
  userId: string
  workspaceId: string
  action: string
  entityType: string
  entityId?: string
  metaJson?: any
  resource?: string
  resourceId?: string
  details?: any
  ipAddress?: string
  userAgent?: string
}

@Injectable()
export class AuditLogService {
  constructor(private readonly prisma: PrismaService) {}

  async log(data: AuditLogData) {
    return this.prisma.auditLog.create({
      data: {
        userId: data.userId,
        workspaceId: data.workspaceId,
        action: data.action,
        entityType: data.entityType,
        entityId: data.entityId,
        metaJson: data.metaJson
      }
    })
  }

  async getLogs(workspaceId: string, limit = 50) {
    return this.prisma.auditLog.findMany({
      where: { workspaceId },
      orderBy: { createdAt: 'desc' },
      take: limit
    })
  }
}
