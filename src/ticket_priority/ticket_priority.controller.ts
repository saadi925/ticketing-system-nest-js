import { Controller, Post, Body, Param, Delete, Put, Get } from '@nestjs/common';
import { TicketPriorityService } from './ticket_priority.service';
import { CreateTicketPriorityDto } from './dto/create-ticket_priority.dto';
import { Roles } from '@/auth/role.decorator';
import { UpdateTicketPriorityDto } from './dto/update-ticket_priority.dto';

@Controller('priorities')
export class TicketPriorityController {
  constructor(private readonly priorityService: TicketPriorityService) {}

  @Post()
  @Roles('admin')
  create(@Body() createPriorityDto: CreateTicketPriorityDto) {
    return this.priorityService.create(createPriorityDto);
  }

  @Get()
  @Roles('admin', 'agent', 'user')
  findAll() {
    return this.priorityService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'agent', 'user')
  findOne(@Param('id') id: string) {
    return this.priorityService.findOne(id);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updatePriorityDto: UpdateTicketPriorityDto) {
    return this.priorityService.update(id, updatePriorityDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.priorityService.remove(id);
  }
}
