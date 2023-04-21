import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { UsersController } from './controllers/';
import { UserDocument, UserSchema } from './models';
import { UsersRepository } from './providers/users.repository';
import { UsersService } from './services';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
