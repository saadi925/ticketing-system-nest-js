import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateColorDto {
  @ApiProperty({ description: 'Name of the color' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'Hex code of the color' })
  @IsString()
  @IsNotEmpty()
  readonly hexCode: string;
}
