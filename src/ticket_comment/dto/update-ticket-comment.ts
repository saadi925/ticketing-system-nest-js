import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateTicketCommentDto {
  @ApiProperty({ description: 'Content of the comment', required: false })
  @IsString()
  @IsNotEmpty()
  content?: string;
}
