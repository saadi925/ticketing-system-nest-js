import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { Color } from '@/schema/color.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  providers: [ColorService],
  controllers: [ColorController],
})
export class ColorModule {}
