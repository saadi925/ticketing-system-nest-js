import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTicketCommentDto {
  @ApiProperty({ description: 'Content of the comment' })
  @IsString()
  @IsNotEmpty()
  content: string;
  @ApiProperty({ description: 'id of the ticket' })
  ticketId : string
}