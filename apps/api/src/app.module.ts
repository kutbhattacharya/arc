import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'

// Modules
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { WorkspacesModule } from './workspaces/workspaces.module'
import { ConnectionsModule } from './connections/connections.module'
import { AnalyticsModule } from './analytics/analytics.module'
import { CampaignsModule } from './campaigns/campaigns.module'
import { RecommendationsModule } from './recommendations/recommendations.module'
import { IngestModule } from './ingest/ingest.module'
import { HealthModule } from './health/health.module'

// Services
import { PrismaService } from './prisma/prisma.service'

// Guards
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'
import { WorkspaceGuard } from './auth/guards/workspace.guard'

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 10,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 50,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),

    // Feature modules
    AuthModule,
    UsersModule,
    WorkspacesModule,
    ConnectionsModule,
    AnalyticsModule,
    CampaignsModule,
    RecommendationsModule,
    IngestModule,
    HealthModule,
  ],
  providers: [
    // Services
    PrismaService,
    // Global guards
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: WorkspaceGuard,
    },
  ],
})
export class AppModule {}


