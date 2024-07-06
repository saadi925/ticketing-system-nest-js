import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateColorDto {
  @ApiProperty({ description: 'Optional name of the color' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly name?: string;

  @ApiProperty({ description: 'Optional hex code of the color' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly hexCode?: string;
}
