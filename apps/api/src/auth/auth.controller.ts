import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler'

import { AuthService, AuthResult } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { Public } from './decorators/public.decorator'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @Throttle({ short: { ttl: 60000, limit: 3 } }) // 3 attempts per minute
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ 
    status: 201, 
    description: 'User successfully registered',
    schema: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            name: { type: 'string' },
            role: { type: 'string' }
          }
        },
        accessToken: { type: 'string' }
      }
    }
  })
  @ApiResponse({ status: 409, description: 'User already exists' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async register(@Body() registerDto: RegisterDto): Promise<AuthResult> {
    return this.authService.register(registerDto)
  }

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Throttle({ short: { ttl: 60000, limit: 5 } }) // 5 attempts per minute
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({ 
    status: 200, 
    description: 'User successfully logged in',
    schema: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            name: { type: 'string' },
            role: { type: 'string' }
          }
        },
        accessToken: { type: 'string' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async login(@Body() loginDto: LoginDto, @Request() req): Promise<AuthResult> {
    return this.authService.login(loginDto)
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @Throttle({ medium: { ttl: 60000, limit: 10 } }) // 10 attempts per minute
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ 
    status: 200, 
    description: 'Token successfully refreshed',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async refresh(@Request() req): Promise<{ accessToken: string }> {
    return this.authService.refreshToken(req.user.id)
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ 
    status: 200, 
    description: 'Current user profile',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        name: { type: 'string' },
        role: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        workspaces: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              role: { type: 'string' }
            }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@Request() req) {
    return {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
      createdAt: req.user.createdAt,
      workspaces: req.user.workspaces || [],
    }
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Logout user (client-side token invalidation)' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 204, description: 'Successfully logged out' })
  async logout(): Promise<void> {
    // In a real implementation, you might want to add the token to a blacklist
    // For now, this is handled on the client side by removing the token
    return
  }

  @Public()
  @Post('forgot-password')
  @Throttle({ short: { ttl: 300000, limit: 3 } }) // 3 attempts per 5 minutes
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request password reset' })
  @ApiResponse({ status: 200, description: 'Password reset email sent' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async forgotPassword(@Body('email') email: string): Promise<{ message: string }> {
    // TODO: Implement password reset functionality
    // This would typically send an email with a secure token
    return { message: 'If an account with that email exists, a password reset link has been sent.' }
  }

  @Public()
  @Post('reset-password')
  @Throttle({ short: { ttl: 300000, limit: 3 } }) // 3 attempts per 5 minutes
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password with token' })
  @ApiResponse({ status: 200, description: 'Password successfully reset' })
  @ApiResponse({ status: 400, description: 'Invalid or expired token' })
  async resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ): Promise<{ message: string }> {
    // TODO: Implement password reset functionality
    // This would validate the token and update the password
    return { message: 'Password successfully reset.' }
  }
}


