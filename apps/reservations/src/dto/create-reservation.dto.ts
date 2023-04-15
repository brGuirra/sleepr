import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  public startDate: Date;

  @IsDate()
  @Type(() => Date)
  public endDate: Date;

  @IsNotEmpty()
  @IsString()
  public placeId: string;

  @IsNotEmpty()
  @IsString()
  public invoiceId: string;
}
