import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({ description: 'Name of the tag' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
