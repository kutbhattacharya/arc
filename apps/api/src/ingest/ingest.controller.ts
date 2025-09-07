import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { IngestService } from './ingest.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@ApiTags('ingest')
@Controller('ingest')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class IngestController {
  constructor(private readonly ingestService: IngestService) {}

  @Post('youtube/channel')
  @ApiOperation({ summary: 'Trigger YouTube channel ingestion' })
  @ApiResponse({ status: 200, description: 'YouTube ingestion triggered' })
  triggerYouTube(@Body('workspaceId') workspaceId: string, @Body('channelId') channelId: string) {
    return this.ingestService.triggerYouTubeIngest(workspaceId, channelId)
  }

  @Post('instagram/account')
  @ApiOperation({ summary: 'Trigger Instagram account ingestion' })
  @ApiResponse({ status: 200, description: 'Instagram ingestion triggered' })
  triggerInstagram(@Body('workspaceId') workspaceId: string, @Body('accountId') accountId: string) {
    return this.ingestService.triggerInstagramIngest(workspaceId, accountId)
  }

  @Post('ads/google')
  @ApiOperation({ summary: 'Trigger Google Ads ingestion' })
  @ApiResponse({ status: 200, description: 'Google Ads ingestion triggered' })
  triggerGoogleAds(@Body('workspaceId') workspaceId: string, @Body('accountId') accountId: string) {
    return this.ingestService.triggerGoogleAdsIngest(workspaceId, accountId)
  }

  @Post('ads/meta')
  @ApiOperation({ summary: 'Trigger Meta Ads ingestion' })
  @ApiResponse({ status: 200, description: 'Meta Ads ingestion triggered' })
  triggerMetaAds(@Body('workspaceId') workspaceId: string, @Body('accountId') accountId: string) {
    return this.ingestService.triggerMetaAdsIngest(workspaceId, accountId)
  }
}
