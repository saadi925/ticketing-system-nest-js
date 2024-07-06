// src/ticket/ticket-comment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '@/schema/ticket.entity';
import { User } from '@/schema/user.entity';
import { TicketComment } from '@/schema/ticket_comment.entity';
import { CreateTicketCommentDto } from './dto/create-ticket-comment';
import { UpdateTicketCommentDto } from './dto/update-ticket-comment';

@Injectable()
export class TicketCommentService {
  constructor(
    @InjectRepository(TicketComment)
    private readonly commentRepository: Repository<TicketComment>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createCommentDto: CreateTicketCommentDto, authorId: string): Promise<TicketComment> {
    const ticket = await this.ticketRepository.findOneBy({ id: createCommentDto.ticketId });
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${createCommentDto.ticketId} not found`);
    }
    
    const author = await this.userRepository.findOneBy({ id: authorId });
    if (!author) {
      throw new NotFoundException(`User with ID ${authorId} not found`);
    }

    const comment = this.commentRepository.create({
      content: createCommentDto.content,
      ticket,
      author,
    });
    
    return this.commentRepository.save(comment);
  }

  async findAll(ticketId: string): Promise<TicketComment[]> {
    return this.commentRepository.find({
      where: { ticket: { id: ticketId } },
      relations: ['author'],
    });
  }

  async update(id: string, updateCommentDto: UpdateTicketCommentDto): Promise<TicketComment> {
    const comment = await this.commentRepository.preload({
      id: id,
      ...updateCommentDto,
    });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return this.commentRepository.save(comment);
  }

  async remove(id: string): Promise<void> {
    const result = await this.commentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }
}
