import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common'
import { prisma } from '@arc/db'

@Injectable()
export class WorkspacesService {
  async create(name: string, ownerId: string) {
    return prisma.workspace.create({
      data: {
        name,
        ownerId,
      },
      include: {
        owner: true,
        members: {
          include: {
            user: true,
          },
        },
      },
    })
  }

  async findAll() {
    return prisma.workspace.findMany({
      include: {
        owner: true,
        members: {
          include: {
            user: true,
          },
        },
      },
    })
  }

  async findOne(id: string) {
    const workspace = await prisma.workspace.findUnique({
      where: { id },
      include: {
        owner: true,
        members: {
          include: {
            user: true,
          },
        },
      },
    })

    if (!workspace) {
      throw new NotFoundException('Workspace not found')
    }

    return workspace
  }

  async update(id: string, name: string) {
    try {
      return prisma.workspace.update({
        where: { id },
        data: { name },
        include: {
          owner: true,
          members: {
            include: {
              user: true,
            },
          },
        },
      })
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Workspace not found')
      }
      throw error
    }
  }

  async remove(id: string) {
    try {
      await prisma.workspace.delete({
        where: { id },
      })
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Workspace not found')
      }
      throw error
    }
  }

  async userHasAccess(userId: string, workspaceId: string): Promise<boolean> {
    const membership = await prisma.workspaceMember.findFirst({
      where: {
        userId,
        workspaceId,
      },
    })

    return !!membership
  }

  async addMember(workspaceId: string, userId: string, role: string = 'MEMBER') {
    return prisma.workspaceMember.create({
      data: {
        workspaceId,
        userId,
        role: role as any,
      },
      include: {
        user: true,
        workspace: true,
      },
    })
  }

  async removeMember(workspaceId: string, userId: string) {
    try {
      await prisma.workspaceMember.delete({
        where: {
          workspaceId_userId: {
            workspaceId,
            userId,
          },
        },
      })
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Workspace membership not found')
      }
      throw error
    }
  }
}

