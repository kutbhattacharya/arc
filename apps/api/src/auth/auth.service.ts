import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcryptjs'

import { UsersService } from '../users/users.service'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

export interface JwtPayload {
  sub: string
  email: string
  role: string
  workspaceId?: string
  iat?: number
  exp?: number
}

export interface AuthResult {
  user: {
    id: string
    email: string
    name: string
    role: string
  }
  accessToken: string
  refreshToken?: string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email)
    
    if (!user) {
      return null
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
    
    if (!isPasswordValid) {
      return null
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...result } = user
    return result
  }

  async register(registerDto: RegisterDto): Promise<AuthResult> {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(registerDto.email)
    if (existingUser) {
      throw new ConflictException('User with this email already exists')
    }

    // Hash password
    const saltRounds = 12
    const passwordHash = await bcrypt.hash(registerDto.password, saltRounds)

    // Create user
    const createUserDto: CreateUserDto = {
      email: registerDto.email,
      name: registerDto.name,
      passwordHash,
    }

    const user = await this.usersService.create(createUserDto)

    // Generate tokens
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    }

    const accessToken = this.jwtService.sign(payload)

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      accessToken,
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResult> {
    const user = await this.validateUser(loginDto.email, loginDto.password)
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    }

    const accessToken = this.jwtService.sign(payload)

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      accessToken,
    }
  }

  async refreshToken(userId: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.findById(userId)
    
    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    }

    const accessToken = this.jwtService.sign(payload)

    return { accessToken }
  }

  async validateJwtPayload(payload: JwtPayload): Promise<any> {
    const user = await this.usersService.findById(payload.sub)
    
    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }
  }

  generateSecureToken(): string {
    return this.jwtService.sign(
      { type: 'secure-token', timestamp: Date.now() },
      { expiresIn: '1h' }
    )
  }

  verifySecureToken(token: string): boolean {
    try {
      const payload = this.jwtService.verify(token)
      return payload.type === 'secure-token'
    } catch {
      return false
    }
  }
}


