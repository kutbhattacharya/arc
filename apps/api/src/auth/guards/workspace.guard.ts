import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { WorkspacesService } from '../../workspaces/workspaces.service'

@Injectable()
export class WorkspaceGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private workspacesService: WorkspacesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const user = request.user
    const workspaceId = request.params.workspaceId || request.body.workspaceId

    if (!user) {
      throw new ForbiddenException('User not authenticated')
    }

    if (!workspaceId) {
      throw new ForbiddenException('Workspace ID required')
    }

    // Check if user has access to the workspace
    const hasAccess = await this.workspacesService.userHasAccess(user.id, workspaceId)
    
    if (!hasAccess) {
      throw new ForbiddenException('Access denied to workspace')
    }

    // Add workspace context to request
    request.workspaceId = workspaceId
    
    return true
  }
}