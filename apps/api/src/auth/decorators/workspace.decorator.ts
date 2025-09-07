import { SetMetadata } from '@nestjs/common'

export const WORKSPACE_KEY = 'workspace'
export const RequireWorkspace = () => SetMetadata(WORKSPACE_KEY, true)
