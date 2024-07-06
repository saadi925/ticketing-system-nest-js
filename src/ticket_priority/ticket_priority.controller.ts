import { Controller, Post, Body, Param, Delete, Put, Get } from '@nestjs/common';
import { TicketPriorityService } from './ticket_priority.service';
import { CreateTicketPriorityDto } from './dto/create-ticket_priority.dto';
import { UpdateTicketPriorityDto } from './dto/update-ticket_priority.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { Roles } from '@/auth/role.decorator';

@ApiTags('priorities')
@ApiBearerAuth()
@Controller('priorities')
export class TicketPriorityController {
  constructor(private readonly priorityService: TicketPriorityService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new ticket priority' })
  @ApiResponse({ status: 201, description: 'The priority has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: CreateTicketPriorityDto })
  create(@Body() createPriorityDto: CreateTicketPriorityDto) {
    return this.priorityService.create(createPriorityDto);
  }

  @Get()
  @Roles('admin', 'agent', 'user')
  @ApiOperation({ summary: 'Get all ticket priorities' })
  @ApiResponse({ status: 200, description: 'List of priorities.' })
  findAll() {
    return this.priorityService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'agent', 'user')
  @ApiOperation({ summary: 'Get a specific ticket priority by ID' })
  @ApiResponse({ status: 200, description: 'The priority details.' })
  @ApiResponse({ status: 404, description: 'Priority not found.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the priority' })
  findOne(@Param('id') id: string) {
    return this.priorityService.findOne(id);
  }

  @Put(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update a ticket priority' })
  @ApiResponse({ status: 200, description: 'The priority has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Priority not found.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the priority' })
  @ApiBody({ type: UpdateTicketPriorityDto })
  update(@Param('id') id: string, @Body() updatePriorityDto: UpdateTicketPriorityDto) {
    return this.priorityService.update(id, updatePriorityDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a ticket priority' })
  @ApiResponse({ status: 204, description: 'The priority has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Priority not found.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the priority' })
  remove(@Param('id') id: string) {
    return this.priorityService.remove(id);
  }
}
