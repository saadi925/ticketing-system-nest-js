import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from '@/schema/ticket.entity';
import { FilterService } from './filter/filter.service';
import { TicketsResponse } from '@/types/TicketResponses';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly filterService: FilterService,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const ticket = this.ticketRepository.create(createTicketDto);
    return this.ticketRepository.save(ticket);
  }

  async findAll(page: number, limit: number, filter?: string): Promise<TicketsResponse> {
    if (filter) {
      const { data, total } = await this.filterService.applyFilters(page, limit, filter);
      return { data, total, page, limit };
    }
    const [data, total] = await this.ticketRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOneBy({ id });
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return ticket;
  }

  async findAssignedTickets(userId: string, page: number, limit: number): Promise<TicketsResponse> {
    const [data, total] = await this.ticketRepository.findAndCount({
      where: { assignee: { id: userId } },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total, page, limit };
  }

  async findCreatedTickets(creatorId: string, page: number, limit: number): Promise<TicketsResponse> {
    const [data, total] = await this.ticketRepository.findAndCount({
      where: { creator: { id: creatorId } },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total, page, limit };
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.ticketRepository.preload({
      id: id,
      ...updateTicketDto,
    });
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return this.ticketRepository.save(ticket);
  }

  async remove(id: string): Promise<void> {
    const result = await this.ticketRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
  }
}
