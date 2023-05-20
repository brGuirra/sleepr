import { User } from '@app/common';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards';
import { CreateUserDto } from '../dto';
import { UserDocument } from '../models';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async create(@Body() data: CreateUserDto): Promise<UserDocument> {
    return this.usersService.create(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  public async show(@User() user: UserDocument): Promise<UserDocument> {
    return user;
  }
}
