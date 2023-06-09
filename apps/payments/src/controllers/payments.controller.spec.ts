import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { PaymentsService } from '../services';
import { PaymentsController } from './payments.controller';

describe('PaymentsController', () => {
  let paymentsController: PaymentsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [PaymentsService],
    }).compile();

    paymentsController = app.get<PaymentsController>(PaymentsController);
  });

  describe('root', () => {
    xit('should return "Hello World!"', () => {
      expect(paymentsController.getHello()).toBe('Hello World!');
    });
  });
});
