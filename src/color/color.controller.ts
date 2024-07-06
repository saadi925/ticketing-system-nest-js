import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('colors')
@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new color' })
  @ApiResponse({ status: 201, description: 'The color has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: CreateColorDto })
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorService.create(createColorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all colors' })
  @ApiResponse({ status: 200, description: 'List of colors.' })
  findAll() {
    return this.colorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific color by ID' })
  @ApiResponse({ status: 200, description: 'The color details.' })
  @ApiResponse({ status: 404, description: 'Color not found.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the color' })
  findOne(@Param('id') id: string) {
    return this.colorService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a color' })
  @ApiResponse({ status: 200, description: 'The color has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the color' })
  @ApiBody({ type: UpdateColorDto })
  update(@Param('id') id: string, @Body() updateColorDto: UpdateColorDto) {
    return this.colorService.update(id, updateColorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a color' })
  @ApiResponse({ status: 204, description: 'The color has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Color not found.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the color' })
  remove(@Param('id') id: string) {
    return this.colorService.remove(id);
  }
}
