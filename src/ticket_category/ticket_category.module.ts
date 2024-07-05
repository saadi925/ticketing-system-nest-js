import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './ticket_category.service';
import { TicketCategory } from '@/schema/ticket_category';
import { CategoryController } from './ticket_category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TicketCategory])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
