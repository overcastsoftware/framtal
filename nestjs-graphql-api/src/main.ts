import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001; // Changed from 3000 to 3001
  
  await app.listen(port);
  Logger.log(`Application is running on: http://localhost:${port}/graphql`);
}

bootstrap();