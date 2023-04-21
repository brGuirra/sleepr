import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsStrongPassword()
  public password: string;
}
