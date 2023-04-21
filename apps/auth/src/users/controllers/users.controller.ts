import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto';
import type { UserDocument } from '../models';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async create(@Body() data: CreateUserDto): Promise<UserDocument> {
    return this.usersService.create(data);
  }
}
