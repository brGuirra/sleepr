import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';
import type { ReservationsEnvironmentVariables } from './config';
import { ReservationsModule } from './reservations.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(ReservationsModule, {
    bufferLogs: true,
  });
  const configService =
    app.get<ConfigService<ReservationsEnvironmentVariables>>(ConfigService);

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useLogger(app.get(Logger));

  await app.listen(configService.get('PORT') as number);
}

void bootstrap();
