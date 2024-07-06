// src/ticket_priority/dto/create-ticket_priority.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTicketPriorityDto {
  @ApiProperty({ description: 'Name of the priority' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Color id of the priority' })
  @IsString()
  @IsNotEmpty()
  colorId: string;
}

