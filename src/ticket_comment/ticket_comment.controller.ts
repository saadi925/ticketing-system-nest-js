import { Controller, Post, Body, Param, Delete, Put, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { TicketCommentService } from './ticket_comment.service';
import { Roles } from '@/auth/role.decorator';
import { JwtAuthGuard } from '@/auth/auth.guard';
import { RolesGuard } from '@/auth/rbac.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateTicketCommentDto } from './dto/create-ticket-comment';
import { UpdateTicketCommentDto } from './dto/update-ticket-comment';


@ApiTags('tickets')
@ApiBearerAuth()
@Controller('tickets/:ticketId/comments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TicketCommentController {
  constructor(private readonly commentService: TicketCommentService) {}

  @Post()
  @Roles('admin', 'agent', 'user')
  @ApiOperation({ summary: 'Create a new comment for a ticket' })
  @ApiResponse({ status: 201, description: 'The comment has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({ name: 'ticketId', required: true, description: 'ID of the ticket' })
  @ApiBody({ type: CreateTicketCommentDto })
  create(@Param('ticketId') ticketId: string, @Body() createCommentDto: CreateTicketCommentDto, @Req() req: Request & { user: any }) {
    const authorId = req.user.id;
    return this.commentService.create({ ...createCommentDto, ticketId }, authorId);
  }

  @Get()
  @Roles('admin', 'agent', 'user')
  @ApiOperation({ summary: 'Get all comments for a ticket' })
  @ApiResponse({ status: 200, description: 'List of comments.' })
  @ApiParam({ name: 'ticketId', required: true, description: 'ID of the ticket' })
  findAll(@Param('ticketId') ticketId: string) {
    return this.commentService.findAll(ticketId);
  }

  @Put(':id')
  @Roles('admin', 'agent')
  @ApiOperation({ summary: 'Update a comment' })
  @ApiResponse({ status: 200, description: 'The comment has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the comment' })
  @ApiBody({ type: UpdateTicketCommentDto })
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateTicketCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @Roles('admin', 'agent')
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiResponse({ status: 204, description: 'The comment has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the comment' })
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
}
