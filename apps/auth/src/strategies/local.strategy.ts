import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import type { UserDocument } from '../users/models';
import { UsersService } from '../users/services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      usernameField: 'email',
    });
  }

  public async validate(
    email: string,
    password: string,
  ): Promise<UserDocument> {
    try {
      return await this.usersService.verify(email, password);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
