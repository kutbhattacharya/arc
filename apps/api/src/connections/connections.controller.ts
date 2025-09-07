import { Controller, Get, Delete, Param, UseGuards, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { ConnectionsService } from './connections.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@ApiTags('connections')
@Controller('connections')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class ConnectionsController {
  constructor(private readonly connectionsService: ConnectionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all account connections' })
  @ApiResponse({ status: 200, description: 'Connections retrieved successfully' })
  findAll(@Query('workspaceId') workspaceId: string) {
    return this.connectionsService.findAll(workspaceId)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get connection by ID' })
  @ApiResponse({ status: 200, description: 'Connection retrieved successfully' })
  findOne(@Param('id') id: string) {
    return this.connectionsService.findOne(id)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Disconnect account' })
  @ApiResponse({ status: 200, description: 'Account disconnected successfully' })
  remove(@Param('id') id: string) {
    return this.connectionsService.remove(id)
  }
}
