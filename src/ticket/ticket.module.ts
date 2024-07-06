import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { Ticket } from '@/schema/ticket.entity';
import { FilterService } from './filter/filter.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]),],
  providers: [TicketService, FilterService],
  controllers: [TicketController],
})
export class TicketModule {}
