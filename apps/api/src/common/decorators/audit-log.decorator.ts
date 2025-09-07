import { SetMetadata } from '@nestjs/common'

export const AUDIT_LOG_KEY = 'auditLog'

export interface AuditLogOptions {
  action: string
  resource: string
  resourceId?: string | ((args: any[]) => string)
  details?: (args: any[]) => Record<string, any>
}

export const AuditLog = (options: AuditLogOptions) => SetMetadata(AUDIT_LOG_KEY, options)
