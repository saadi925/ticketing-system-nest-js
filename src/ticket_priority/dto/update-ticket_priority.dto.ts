import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateTicketPriorityDto {
  @ApiProperty({ description: 'Name of the priority', required: false })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ description: 'Color id of the priority', required: false })
  @IsString()
  @IsNotEmpty()
  colorId?: string;
}
