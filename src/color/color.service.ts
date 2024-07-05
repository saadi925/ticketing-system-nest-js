// src/color/color.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from '@/schema/color.entity';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}

  async create(createColorDto: CreateColorDto): Promise<Color> {
    const color = this.colorRepository.create(createColorDto);
    return this.colorRepository.save(color);
  }

  async findAll(): Promise<Color[]> {
    return this.colorRepository.find();
  }

  async findOne(id: string): Promise<Color> {
    const color = await this.colorRepository.findOneBy({id});
    if (!color) {
      throw new NotFoundException(`Color with ID ${id} not found`);
    }
    return color;
  }

  async update(id: string, updateColorDto: UpdateColorDto): Promise<Color> {
    const color = await this.colorRepository.preload({
      id: id,
      ...updateColorDto,
    });
    if (!color) {
      throw new NotFoundException(`Color with ID ${id} not found`);
    }
    return this.colorRepository.save(color);
  }

  async remove(id: string): Promise<void> {
    const result = await this.colorRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Color with ID ${id} not found`);
    }
  }
}
