import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketCommentService } from './ticket_comment.service';
import { TicketCommentController } from './ticket_comment.controller';
import { TicketComment } from '@/schema/ticket_comment.entity';
import { User } from '@/schema/user.entity';
import { Ticket } from '@/schema/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TicketComment, User, Ticket])],
  providers: [TicketCommentService],
  controllers: [TicketCommentController],
})
export class TicketCommentModule {}
