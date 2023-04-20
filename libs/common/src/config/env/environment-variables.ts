import { IsNotEmpty, IsString } from 'class-validator';

export class EnvironmentVariables {
  @IsNotEmpty()
  @IsString()
  public readonly MONGO_DB_URI: string;
}
