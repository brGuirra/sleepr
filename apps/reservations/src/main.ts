import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { ReservationsModule } from './reservations.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(ReservationsModule, {
    bufferLogs: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useLogger(app.get(Logger));

  await app.listen(3000);
}
void bootstrap();
