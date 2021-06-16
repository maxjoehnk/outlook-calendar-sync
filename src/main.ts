import 'dotenv/config';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {BunyanLogger} from './logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new BunyanLogger(),
  });
  app.setGlobalPrefix('api');
  await app.listen(5000);
}

bootstrap()
