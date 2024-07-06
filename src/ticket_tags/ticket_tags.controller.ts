import { Roles } from '@/auth/role.decorator';
import { Controller, Post, Body, Param, Delete, Put, Get } from '@nestjs/common';
import { CreateTagDto } from './dto/create-ticket_tag.dto';
import { TagService } from './ticket_tags.service';
import { UpdateTicketTagDto } from './dto/update-ticket_tag.dto';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @Roles('admin')
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Get()
  @Roles('admin', 'agent', 'user')
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'agent', 'user')
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(id);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTicketTagDto) {
    return this.tagService.update(id, updateTagDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.tagService.remove(id);
  }
}
