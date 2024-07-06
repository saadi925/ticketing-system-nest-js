import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const options = new DocumentBuilder()
  .setTitle('Ticketting System')
  .setDescription('An api for your personalized Crm')
  .setVersion('1.0')
  .addServer('http://localhost:5000/', 'Local environment')
  .addServer('https://staging.yourapi.com/', 'Staging')
  .addServer('https://production.yourapi.com/', 'Production')
  .addTag('Crm Api')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(5000);
}
bootstrap();
