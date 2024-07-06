// src/filter/filter.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilterService } from './filter.service';
import { Ticket } from '@/schema/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  providers: [FilterService],
  exports: [FilterService],
})
export class FilterModule {}
