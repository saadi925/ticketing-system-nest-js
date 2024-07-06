// src/ticket/ticket.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { RolesGuard } from '@/auth/rbac.guard';
import { JwtAuthGuard } from '@/auth/auth.guard';
import { Roles } from '@/auth/role.decorator';
const intPipe = new ParseIntPipe({optional : true});
@Controller('tickets')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @Roles('admin', 'agent')
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @Get()
  @Roles('admin', 'agent', 'user')
  findAll(
    @Query('page', intPipe) page = 1,
    @Query('limit', intPipe) limit = 10,
    @Query('filter') filter?: string,
  ) {
    return this.ticketService.findAll(Number(page), Number(limit), filter);
  }

  @Get(':id')
  @Roles('admin', 'agent', 'user')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(id);
  }

  @Put(':id')
  @Roles('admin', 'agent')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(id, updateTicketDto);
  }

  @Delete(':id')
  @Roles('admin', 'agent')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(id);
  }
}
