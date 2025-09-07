import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        role: createUserDto.role
      }
    })
  }

  async findAll() {
    return this.prisma.user.findMany()
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id }
    })
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email }
    })
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id }
    })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto
    })
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id }
    })
  }

  async getUserWorkspaces(userId: string) {
    return this.prisma.workspace.findMany({
      where: {
        OR: [
          { ownerId: userId },
          { members: { some: { userId } } }
        ]
      }
    })
  }
}


