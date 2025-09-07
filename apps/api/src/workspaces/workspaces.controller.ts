import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { WorkspacesService } from './workspaces.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@ApiTags('workspaces')
@Controller('workspaces')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workspace' })
  @ApiResponse({ status: 201, description: 'Workspace successfully created' })
  create(@Body('name') name: string, @Request() req) {
    return this.workspacesService.create(name, req.user.id)
  }

  @Get()
  @ApiOperation({ summary: 'Get all workspaces' })
  @ApiResponse({ status: 200, description: 'Workspaces retrieved successfully' })
  findAll() {
    return this.workspacesService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get workspace by ID' })
  @ApiResponse({ status: 200, description: 'Workspace retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Workspace not found' })
  findOne(@Param('id') id: string) {
    return this.workspacesService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update workspace' })
  @ApiResponse({ status: 200, description: 'Workspace updated successfully' })
  @ApiResponse({ status: 404, description: 'Workspace not found' })
  update(@Param('id') id: string, @Body('name') name: string) {
    return this.workspacesService.update(id, name)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete workspace' })
  @ApiResponse({ status: 200, description: 'Workspace deleted successfully' })
  @ApiResponse({ status: 404, description: 'Workspace not found' })
  remove(@Param('id') id: string) {
    return this.workspacesService.remove(id)
  }

  @Post(':id/members')
  @ApiOperation({ summary: 'Add member to workspace' })
  @ApiResponse({ status: 201, description: 'Member added successfully' })
  addMember(
    @Param('id') workspaceId: string,
    @Body('userId') userId: string,
    @Body('role') role: string = 'MEMBER',
  ) {
    return this.workspacesService.addMember(workspaceId, userId, role)
  }

  @Delete(':id/members/:userId')
  @ApiOperation({ summary: 'Remove member from workspace' })
  @ApiResponse({ status: 200, description: 'Member removed successfully' })
  removeMember(@Param('id') workspaceId: string, @Param('userId') userId: string) {
    return this.workspacesService.removeMember(workspaceId, userId)
  }
}
