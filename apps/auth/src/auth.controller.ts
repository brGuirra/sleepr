import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { User } from './decorators';
import { LocalAuthGuard } from './guards';
import { UserDocument } from './users/models';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(
    @User() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Response> {
    await this.authService.login(user, response);

    return response.send(user);
  }
}
