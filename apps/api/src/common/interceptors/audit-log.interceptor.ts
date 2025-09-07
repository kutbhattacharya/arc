import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { AuditLogService, AuditLogData } from '../audit-log.service'
import { AUDIT_LOG_KEY, AuditLogOptions } from '../decorators/audit-log.decorator'

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private auditLogService: AuditLogService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const auditOptions = this.reflector.get<AuditLogOptions>(AUDIT_LOG_KEY, context.getHandler())
    
    if (!auditOptions) {
      return next.handle()
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user
    const args = context.getArgs()

    return next.handle().pipe(
      tap(() => {
        if (user) {
          const auditData: AuditLogData = {
            userId: user.id,
            workspaceId: request.workspaceId,
            action: auditOptions.action,
            entityType: auditOptions.resource,
            resource: auditOptions.resource,
            resourceId: typeof auditOptions.resourceId === 'function' 
              ? auditOptions.resourceId(args) 
              : auditOptions.resourceId,
            details: auditOptions.details ? auditOptions.details(args) : undefined,
            ipAddress: request.ip,
            userAgent: request.headers['user-agent']
          }

          this.auditLogService.log(auditData)
        }
      })
    )
  }
}
