import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  public getHello(): string {
    return 'Hello World!';
  }
}
