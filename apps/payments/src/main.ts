import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import type { PaymentsEnvironmentVariables } from './config';
import { PaymentsModule } from './payments.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(PaymentsModule, {
    bufferLogs: true,
  });
  const configService =
    app.get<ConfigService<PaymentsEnvironmentVariables>>(ConfigService);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('PORT', { infer: true }),
    },
  });

  app.useLogger(app.get(Logger));

  await app.startAllMicroservices();
}
void bootstrap();
