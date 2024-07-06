import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TagService } from './ticket_tags.service';
import { UpdateTicketTagDto } from './dto/update-ticket_tag.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Roles } from '@/auth/role.decorator';
import { CreateTagDto } from './dto/create-ticket_tag.dto';

@ApiTags('tags')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tag' })
  @ApiResponse({ status: 201, description: 'The tag has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: CreateTagDto })
  @Roles('admin')
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tags' })
  @ApiResponse({ status: 200, description: 'List of tags.' })
  @Roles('admin', 'agent', 'user')
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific tag by ID' })
  @ApiResponse({ status: 200, description: 'The tag details.' })
  @ApiResponse({ status: 404, description: 'Tag not found.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the tag' })
  @Roles('admin', 'agent', 'user')
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a tag' })
  @ApiResponse({ status: 200, description: 'The tag has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the tag' })
  @ApiBody({ type: UpdateTicketTagDto })
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTicketTagDto) {
    return this.tagService.update(id, updateTagDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tag' })
  @ApiResponse({ status: 204, description: 'The tag has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Tag not found.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the tag' })
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.tagService.remove(id);
  }
}
