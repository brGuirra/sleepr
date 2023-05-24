import { LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import type { PaymentsEnvironmentVariables } from './config';
import { PaymentsController } from './controllers/payments.controller';
import { PaymentsService } from './services';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object<PaymentsEnvironmentVariables, true>({
        PORT: Joi.number().required(),
      }),
    }),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
