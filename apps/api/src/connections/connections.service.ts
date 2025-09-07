import { Injectable } from '@nestjs/common'
import { prisma } from '@arc/db'

@Injectable()
export class ConnectionsService {
  async findAll(workspaceId: string) {
    return prisma.accountConnection.findMany({
      where: { workspaceId },
    })
  }

  async findOne(id: string) {
    return prisma.accountConnection.findUnique({
      where: { id },
    })
  }

  async remove(id: string) {
    return prisma.accountConnection.delete({
      where: { id },
    })
  }
}

