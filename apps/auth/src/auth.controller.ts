import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { User } from './decorators';
import { JwtAuthGuard, LocalAuthGuard } from './guards';
import { UserDocument } from './users/models';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  public async login(
    @User() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Response> {
    await this.authService.login(user, response);

    return response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  public async authenticate(@Payload() data: any): Promise<any> {
    return data.user;
  }
}
