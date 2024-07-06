// src/ticket/dto/create-ticket-priority.dto.ts
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateTicketPriorityDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  colorId: string;
}
