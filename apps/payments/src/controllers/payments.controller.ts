import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from '../services';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  public getHello(): string {
    return this.paymentsService.getHello();
  }
}
