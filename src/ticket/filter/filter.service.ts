// src/filter/filter.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from '@/schema/ticket.entity';

@Injectable()
export class FilterService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async applyFilters(
    page: number,
    limit: number,
    filter: string,
  ): Promise<{ data: Ticket[]; total: number }> {
    const query = this.ticketRepository.createQueryBuilder('ticket');

    // Example: priority_is_..._and_category_is...
    const filters = filter.split('_and_');
    filters.forEach(f => {
      const [field, operator, value] = f.split('_is_');
      if (field && operator && value) {
        switch (field) {
          case 'priority':
            query.andWhere('ticket.priorityId = :value', { value });
            break;
          case 'category':
            query.andWhere('ticket.categoryId = :value', { value });
            break;
          case 'color':
            query.leftJoinAndSelect('ticket.category', 'category')
                 .leftJoinAndSelect('category.color', 'color')
                 .andWhere('color.id = :value', { value });
            break;
          // Add more cases as needed
        }
      }
    });

    // Handle ordering
    if (filter.includes('order_is_oldest')) {
      query.orderBy('ticket.createdAt', 'ASC');
    } else if (filter.includes('order_is_newest')) {
      query.orderBy('ticket.createdAt', 'DESC');
    }

    const [data, total] = await query.skip((page - 1) * limit).take(limit).getManyAndCount();
    return { data, total };
  }
}
