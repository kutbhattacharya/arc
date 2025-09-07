import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { AnalyticsService } from './analytics.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@ApiTags('analytics')
@Controller('analytics')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('comments')
  @ApiOperation({ summary: 'Get comments analytics' })
  @ApiResponse({ status: 200, description: 'Comments retrieved successfully' })
  getComments(@Query() filters: any) {
    return this.analyticsService.getComments(filters.workspaceId, filters)
  }

  @Get('roi')
  @ApiOperation({ summary: 'Get ROI analytics' })
  @ApiResponse({ status: 200, description: 'ROI data retrieved successfully' })
  getROI(@Query() filters: any) {
    return this.analyticsService.getROI(filters.workspaceId, filters)
  }

  @Get('trends')
  @ApiOperation({ summary: 'Get trends analytics' })
  @ApiResponse({ status: 200, description: 'Trends retrieved successfully' })
  getTrends(@Query() filters: any) {
    return this.analyticsService.getTrends(filters.workspaceId, filters)
  }
}
