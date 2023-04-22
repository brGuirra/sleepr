import { IsEmpty, IsString } from 'class-validator';

export class GetUserByIdDto {
  @IsEmpty()
  @IsString()
  public _id: string;
}
