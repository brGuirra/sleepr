import type { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type {
  ModelDefinition,
  MongooseModuleFactoryOptions,
} from '@nestjs/mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import type { EnvironmentVariables } from '../config';
import { ConfigModule } from '../config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService<EnvironmentVariables>,
      ): MongooseModuleFactoryOptions => ({
        uri: configService.get('MONGO_DB_URI', { infer: true }),
      }),
    }),
  ],
})
export class DatabaseModule {
  public static forFeature(models: ModelDefinition[]): DynamicModule {
    return MongooseModule.forFeature(models);
  }
}
