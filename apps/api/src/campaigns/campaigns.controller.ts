import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { CampaignsService } from './campaigns.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@ApiTags('campaigns')
@Controller('campaigns')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new campaign' })
  @ApiResponse({ status: 201, description: 'Campaign successfully created' })
  create(@Body() data: any) {
    return this.campaignsService.create(data)
  }

  @Get()
  @ApiOperation({ summary: 'Get all campaigns' })
  @ApiResponse({ status: 200, description: 'Campaigns retrieved successfully' })
  findAll(@Query('workspaceId') workspaceId: string) {
    return this.campaignsService.findAll(workspaceId)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get campaign by ID' })
  @ApiResponse({ status: 200, description: 'Campaign retrieved successfully' })
  findOne(@Param('id') id: string) {
    return this.campaignsService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update campaign' })
  @ApiResponse({ status: 200, description: 'Campaign updated successfully' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.campaignsService.update(id, data)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete campaign' })
  @ApiResponse({ status: 200, description: 'Campaign deleted successfully' })
  remove(@Param('id') id: string) {
    return this.campaignsService.remove(id)
  }
}
