import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { AuthService, JwtPayload } from '../auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
      issuer: 'rust-api',
      audience: 'rust-app',
    })
  }

  async validate(payload: JwtPayload) {
    try {
      const user = await this.authService.validateJwtPayload(payload)
      
      if (!user) {
        throw new UnauthorizedException('Invalid token payload')
      }

      return user
    } catch (error) {
      throw new UnauthorizedException('Token validation failed')
    }
  }
}


