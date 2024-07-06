import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { entities } from './schema';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TicketModule } from './ticket/ticket.module';
import { ColorModule } from './color/color.module';
import { CategoryModule } from './ticket_category/ticket_category.module';
import { TicketCommentModule } from './ticket_comment/ticket_comment.module';
import { TicketPriorityModule } from './ticket_priority/ticket_priority.module';
import { TicketTagsModule } from './ticket_tags/ticket_tags.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature(entities),
    ConfigModule.forRoot({
      envFilePath : ".env",
      isGlobal : true
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
    }),
    AuthModule,
    TicketModule,
    ColorModule,
    CategoryModule,
    CategoryModule,
    TicketCommentModule,
    TicketPriorityModule,
    TicketTagsModule 
   ],
})
export class AppModule {}
