import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { applyMiddlewares } from "./app.middlewares";

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const port = 3400;

  const app = await NestFactory.create(AppModule);

  applyMiddlewares(app);

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}

bootstrap();
