import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { ReservationsRepository } from '../providers';
import { ReservationsService } from './reservations.service';

describe('ReservationsService', () => {
  let reservationsService: ReservationsService;
  let reservationsRepository: ReservationsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: ReservationsRepository,
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findOneAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    reservationsService = module.get<ReservationsService>(ReservationsService);

    reservationsRepository = module.get<ReservationsRepository>(
      ReservationsRepository,
    );
  });

  it('should be defined', () => {
    expect(reservationsService).toBeDefined();
    expect(reservationsRepository).toBeDefined();
  });
});
