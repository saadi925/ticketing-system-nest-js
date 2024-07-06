import { Controller, Post, Body, Param, Delete, Put, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { TicketCommentService } from './ticket_comment.service';
import { Roles } from '@/auth/role.decorator';
import { CreateTicketCommentDto } from './dto/create-ticket-comment';
import { UpdateTicketCommentDto } from './dto/update-ticket-comment';
import { JwtAuthGuard } from '@/auth/auth.guard';
import { RolesGuard } from '@/auth/rbac.guard';

@UseGuards(JwtAuthGuard , RolesGuard)
@Controller('tickets/:ticketId/comments')
export class TicketCommentController {
  constructor(private readonly commentService: TicketCommentService) {}

  @Post()
  @Roles('admin', 'agent', 'user')
  create(@Param('ticketId') ticketId: string, @Body() createCommentDto: CreateTicketCommentDto, @Req() req: Request & {user : any}) {
    const authorId = req.user.id;
    return this.commentService.create({ ...createCommentDto, ticketId }, authorId);
  }

  @Get()
  @Roles('admin', 'agent', 'user')
  findAll(@Param('ticketId') ticketId: string) {
    return this.commentService.findAll(ticketId);
  }

  @Put(':id')
  @Roles('admin', 'agent')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateTicketCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @Roles('admin', 'agent')
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
}
