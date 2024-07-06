// src/ticket/dto/create-ticket.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({ description: 'Subject of the ticket' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ description: 'Description of the ticket' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'ID of the ticket status' })
  @IsString()
  @IsNotEmpty()
  statusId: string;

  @ApiProperty({ description: 'ID of the ticket priority' })
  @IsString()
  @IsNotEmpty()
  priorityId: string;

  @ApiProperty({ description: 'ID of the ticket category' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ description: 'ID of the ticket creator' })
  @IsString()
  @IsNotEmpty()
  creatorId: string;

  @ApiProperty({ description: 'ID of the ticket assignee', required: false })
  @IsString()
  @IsOptional()
  assigneeId?: string;

  @ApiProperty({ description: 'IDs of the ticket tags' })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tagIds: string[];
}

