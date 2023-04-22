import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
import type { AuthEnvironmentVariables } from './config';
import type { TokenPayload } from './models';
import type { UserDocument } from './users/models';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<AuthEnvironmentVariables>,
    private readonly jwtService: JwtService,
  ) {}

  public async login(user: UserDocument, response: Response): Promise<void> {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() +
        Number(this.configService.get('JWT_EXPIRATION', { infer: true })),
    );
    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
}
