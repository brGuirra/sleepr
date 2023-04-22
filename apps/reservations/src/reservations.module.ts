import { AUTH_SERVICE, DatabaseModule, LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { ClientProvider } from '@nestjs/microservices';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';
import type { ReservationsEnvironmentVariables } from './config';
import { ReservationsController } from './controllers';
import { ReservationDocument, ReservationSchema } from './models';
import { ReservationsRepository } from './providers';
import { ReservationsService } from './services';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object<ReservationsEnvironmentVariables, true>({
        MONGO_DB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        AUTH_HOST: Joi.string().required(),
        AUTH_PORT: Joi.number().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: AUTH_SERVICE,
        useFactory: (
          configService: ConfigService<ReservationsEnvironmentVariables>,
        ): ClientProvider => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_HOST'),
            port: configService.get('AUTH_PORT'),
          },
        }),
      },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
