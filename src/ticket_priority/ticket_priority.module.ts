import { Module } from '@nestjs/common';
import { TicketPriorityService } from './ticket_priority.service';
import { TicketPriorityController } from './ticket_priority.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketPriority } from '@/schema/ticket_priority.entity';
import { Color } from '@/schema/color.entity';

@Module({
  imports : [TypeOrmModule.forFeature([TicketPriority, Color])],
  controllers: [TicketPriorityController],
  providers: [TicketPriorityService],
})
export class TicketPriorityModule {}
