import { LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, LoggerModule],
})
export class AuthModule {}
