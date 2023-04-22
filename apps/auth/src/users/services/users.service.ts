import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import type { CreateUserDto, GetUserByIdDto } from '../dto';
import type { UserDocument } from '../models';
import { UsersRepository } from '../providers';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async create(data: CreateUserDto): Promise<UserDocument> {
    await this.validateIfEmailIsInUse(data.email);

    return this.usersRepository.create({
      ...data,
      password: await bcrypt.hash(data.password, 10),
    });
  }

  private async validateIfEmailIsInUse(email: string): Promise<void> {
    try {
      await this.usersRepository.findOne({ email });
    } catch (error) {
      return;
    }

    throw new UnprocessableEntityException('Email already in use');
  }

  public async verify(email: string, password: string): Promise<UserDocument> {
    const user = await this.usersRepository.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  public async getById(getUserByIdDto: GetUserByIdDto): Promise<UserDocument> {
    return this.usersRepository.findOne(getUserByIdDto);
  }
}
