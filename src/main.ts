import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port);
  console.log(`Server listening on port ${port}`);
}
bootstrap();
