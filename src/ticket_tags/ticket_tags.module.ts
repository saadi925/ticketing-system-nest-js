import { Module } from '@nestjs/common';
import { TagController } from './ticket_tags.controller';
import { TagService } from './ticket_tags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from '@/schema/ticket_tag.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Tag])],
  controllers: [TagController],
  providers: [TagService],
})
export class TicketTagsModule {}
