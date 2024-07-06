import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTicketTagDto {
  @ApiProperty({ description: 'Optional name of the tag' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly name?: string;
}
