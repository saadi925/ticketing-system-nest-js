import { TicketCategory } from '@/schema/ticket_category';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(TicketCategory)
    private readonly categoryRepository: Repository<TicketCategory>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<TicketCategory> {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async findAll(): Promise<TicketCategory[]> {
    return this.categoryRepository.find({ relations: ['color'] });
  }

  async findOne(id: string): Promise<TicketCategory> {
    const category = await this.categoryRepository.findOneBy({id});
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<TicketCategory> {
    const category = await this.categoryRepository.preload({
      id: id,
      ...updateCategoryDto,
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return this.categoryRepository.save(category);
  }

  async remove(id: string): Promise<void> {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }
}
