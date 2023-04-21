import { Injectable } from '@nestjs/common';
import type { CreateUserDto } from '../dto';
import type { UserDocument } from '../models';
import { UsersRepository } from '../providers/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async create(data: CreateUserDto): Promise<UserDocument> {
    return this.usersRepository.create(data);
  }
}
