// src/ticket/ticket-priority.service.ts
import { Color } from '@/schema/color.entity';
import { TicketPriority } from '@/schema/ticket_priority.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketPriorityDto } from './dto/create-ticket_priority.dto';
import { UpdateTicketPriorityDto } from './dto/update-ticket_priority.dto';

@Injectable()
export class TicketPriorityService {
  constructor(
    @InjectRepository(TicketPriority)
    private readonly priorityRepository: Repository<TicketPriority>,
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}

  async create(createPriorityDto: CreateTicketPriorityDto): Promise<TicketPriority> {
    const priority = this.priorityRepository.create(createPriorityDto);
    if (createPriorityDto.colorId) {
      const color = await this.colorRepository.findOneBy({ id: createPriorityDto.colorId });
      if (!color) {
        throw new NotFoundException(`Color with ID ${createPriorityDto.colorId} not found`);
      }
      priority.color = color;
    }
    return this.priorityRepository.save(priority);
  }

  async findAll(): Promise<TicketPriority[]> {
    return this.priorityRepository.find({ relations: ['color'] });
  }

  async findOne(id: string): Promise<TicketPriority> {
    const priority = await this.priorityRepository.findOne({
      where: { id },
      relations: ['color'],
    });
    if (!priority) {
      throw new NotFoundException(`Priority with ID ${id} not found`);
    }
    return priority;
  }

  async update(id: string, updatePriorityDto: UpdateTicketPriorityDto): Promise<TicketPriority> {
    const priority = await this.priorityRepository.preload({
      id,
      ...updatePriorityDto,
    });
    if (!priority) {
      throw new NotFoundException(`Priority with ID ${id} not found`);
    }
    if (updatePriorityDto.colorId) {
      const color = await this.colorRepository.findOneBy({ id: updatePriorityDto.colorId });
      if (!color) {
        throw new NotFoundException(`Color with ID ${updatePriorityDto.colorId} not found`);
      }
      priority.color = color;
    }
    return this.priorityRepository.save(priority);
  }

  async remove(id: string): Promise<void> {
    const result = await this.priorityRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Priority with ID ${id} not found`);
    }
  }
}
