// src/ticket/ticket.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { RolesGuard } from '@/auth/rbac.guard';
import { JwtAuthGuard } from '@/auth/auth.guard';
import { Roles } from '@/auth/role.decorator';

const intPipe = new ParseIntPipe({ optional: true });

@ApiTags('tickets')
@ApiBearerAuth()
@Controller('tickets')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @Roles('admin', 'agent')
  @ApiOperation({ summary: 'Create a new ticket' })
  @ApiResponse({ status: 201, description: 'The ticket has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @Get()
  @Roles('admin', 'agent', 'user')
  @ApiOperation({ summary: 'Get all tickets with optional pagination and filtering' })
  @ApiResponse({ status: 200, description: 'List of tickets.' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'filter', required: false, type: String })
  findAll(
    @Query('page', intPipe) page = 1,
    @Query('limit', intPipe) limit = 10,
    @Query('filter') filter?: string,
  ) {
    return this.ticketService.findAll(Number(page), Number(limit), filter);
  }

  @Get(':id')
  @Roles('admin', 'agent', 'user')
  @ApiOperation({ summary: 'Get a specific ticket by ID' })
  @ApiResponse({ status: 200, description: 'The ticket details.' })
  @ApiResponse({ status: 404, description: 'Ticket not found.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the ticket' })
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(id);
  }

  @Put(':id')
  @Roles('admin', 'agent')
  @ApiOperation({ summary: 'Update a ticket' })
  @ApiResponse({ status: 200, description: 'The ticket has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Ticket not found.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the ticket' })
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(id, updateTicketDto);
  }

  @Delete(':id')
  @Roles('admin', 'agent')
  @ApiOperation({ summary: 'Delete a ticket' })
  @ApiResponse({ status: 204, description: 'The ticket has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Ticket not found.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the ticket' })
  remove(@Param('id') id: string) {
    return this.ticketService.remove(id);
  }
}
