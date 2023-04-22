import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { AuthEnvironmentVariables } from '../config';
import type { TokenPayload } from '../models';
import type { UserDocument } from '../users/models';
import { UsersService } from '../users/services';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ConfigService)
    configService: ConfigService<AuthEnvironmentVariables>,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request): string => request?.cookies?.Authentication,
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  public async validate({ userId }: TokenPayload): Promise<UserDocument> {
    return this.usersService.getById({ _id: userId });
  }
}
