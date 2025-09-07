import { Injectable } from '@nestjs/common'
import { prisma } from '@rust/db'

@Injectable()
export class CampaignsService {
  async create(data: any) {
    return prisma.campaign.create({
      data,
    })
  }

  async findAll(workspaceId: string) {
    return prisma.campaign.findMany({
      where: { workspaceId },
      include: {
        spends: true,
        roiViews: true,
      },
    })
  }

  async findOne(id: string) {
    return prisma.campaign.findUnique({
      where: { id },
      include: {
        spends: true,
        roiViews: true,
      },
    })
  }

  async update(id: string, data: any) {
    return prisma.campaign.update({
      where: { id },
      data,
    })
  }

  async remove(id: string) {
    return prisma.campaign.delete({
      where: { id },
    })
  }
}
