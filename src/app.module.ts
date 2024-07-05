import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { entities } from './schema';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './auth/auth.guard';
import { RolesGuard } from './auth/rbac.guard';
import { APP_GUARD } from '@nestjs/core';
import { TicketModule } from './ticket/ticket.module';
import { ColorModule } from './color/color.module';
import { CategoryModule } from './ticket_category/ticket_category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature(entities),
    AuthModule,
    ConfigModule.forRoot({
      envFilePath : ".env"
    }),
    TicketModule,
    ColorModule,
    CategoryModule,
    CategoryModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
