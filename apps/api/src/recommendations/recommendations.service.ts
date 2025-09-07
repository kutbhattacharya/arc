import { Injectable } from '@nestjs/common'
import { prisma } from '@arc/db'

@Injectable()
export class RecommendationsService {
  async findAll(workspaceId: string) {
    return prisma.recommendation.findMany({
      where: { workspaceId },
      orderBy: { createdAt: 'desc' },
    })
  }

  async findOne(id: string) {
    return prisma.recommendation.findUnique({
      where: { id },
    })
  }

  async create(data: any) {
    return prisma.recommendation.create({
      data,
    })
  }

  async remove(id: string) {
    return prisma.recommendation.delete({
      where: { id },
    })
  }
}

