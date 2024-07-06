// src/ticket/dto/create-ticket-comment.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  ticketId: string;
}

