import { Controller, Get, Post, Body, Delete, Param, UseGuards, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { RecommendationsService } from './recommendations.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@ApiTags('recommendations')
@Controller('recommendations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all recommendations' })
  @ApiResponse({ status: 200, description: 'Recommendations retrieved successfully' })
  findAll(@Query('workspaceId') workspaceId: string) {
    return this.recommendationsService.findAll(workspaceId)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get recommendation by ID' })
  @ApiResponse({ status: 200, description: 'Recommendation retrieved successfully' })
  findOne(@Param('id') id: string) {
    return this.recommendationsService.findOne(id)
  }

  @Post()
  @ApiOperation({ summary: 'Create a new recommendation' })
  @ApiResponse({ status: 201, description: 'Recommendation successfully created' })
  create(@Body() data: any) {
    return this.recommendationsService.create(data)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete recommendation' })
  @ApiResponse({ status: 200, description: 'Recommendation deleted successfully' })
  remove(@Param('id') id: string) {
    return this.recommendationsService.remove(id)
  }
}
