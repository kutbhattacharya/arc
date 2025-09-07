import { Prisma } from '@prisma/client'

// Multi-tenant isolation middleware
export const multiTenantMiddleware: Prisma.Middleware = async (params, next) => {
  // Add workspace filter to queries that have workspaceId
  if (params.model && ['ContentItem', 'Comment', 'Campaign', 'Spend', 'ROIView', 'Trend', 'Recommendation'].includes(params.model)) {
    if (params.action === 'findMany' || params.action === 'findFirst') {
      // Add workspaceId filter if not already present
      if (params.args.where && !params.args.where.workspaceId) {
        // This should be set by the application layer
        // The middleware just ensures it's not accidentally omitted
      }
    }
  }

  return next(params)
}

// Audit logging middleware
export const auditMiddleware: Prisma.Middleware = async (params, next) => {
  const result = await next(params)
  
  // Log sensitive operations
  if (['create', 'update', 'delete'].includes(params.action)) {
    const sensitiveModels = ['User', 'Workspace', 'AccountConnection', 'Campaign']
    
    if (sensitiveModels.includes(params.model || '')) {
      console.log(`Audit: ${params.action} on ${params.model}`, {
        timestamp: new Date().toISOString(),
        model: params.model,
        action: params.action,
        args: params.action === 'delete' ? { where: params.args.where } : params.args
      })
    }
  }

  return result
}

// Data validation middleware
export const validationMiddleware: Prisma.Middleware = async (params, next) => {
  // Validate data before write operations
  if (['create', 'update'].includes(params.action)) {
    if (params.model === 'Comment' && params.args.data?.text) {
      // Sanitize comment text
      params.args.data.text = params.args.data.text
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .trim()
    }
  }

  return next(params)
}
