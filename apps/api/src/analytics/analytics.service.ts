import { Injectable } from '@nestjs/common'
import { prisma } from '@arc/db'

@Injectable()
export class AnalyticsService {
  async getComments(workspaceId: string, filters: any) {
    return prisma.comment.findMany({
      where: {
        contentItem: {
          channel: {
            workspaceId,
          },
        },
        ...filters,
      },
      include: {
        contentItem: {
          include: {
            channel: true,
          },
        },
      },
    })
  }

  async getROI(workspaceId: string, filters: any) {
    return prisma.rOIView.findMany({
      where: {
        campaign: {
          workspaceId,
        },
        ...filters,
      },
      include: {
        campaign: true,
      },
    })
  }

  async getTrends(workspaceId: string, filters: any) {
    return prisma.trend.findMany({
      where: {
        workspaceId,
        ...filters,
      },
    })
  }
}

