import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';
import { AuthModule } from './auth.module';
import type { AuthEnvironmentVariables } from './config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AuthModule, {
    bufferLogs: true,
  });
  const configService =
    app.get<ConfigService<AuthEnvironmentVariables>>(ConfigService);

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
