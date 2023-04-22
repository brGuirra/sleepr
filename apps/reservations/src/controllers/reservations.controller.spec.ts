import { JwtAuthGuard } from '@app/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { ReservationsService } from '../services';
import { ReservationsController } from './reservations.controller';

describe('ReservationsController', () => {
  let reservationsController: ReservationsController;
  let reservationsService: ReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationsController],
      providers: [
        {
          provide: ReservationsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: jest.fn(() => true),
      })
      .compile();

    reservationsController = module.get<ReservationsController>(
      ReservationsController,
    );

    reservationsService = module.get<ReservationsService>(ReservationsService);
  });

  it('should be defined', () => {
    expect(reservationsController).toBeDefined();
    expect(reservationsService).toBeDefined();
  });
});
