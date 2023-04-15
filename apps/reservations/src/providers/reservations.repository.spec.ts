import { getModelToken } from '@nestjs/mongoose';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { Model } from 'mongoose';
import { ReservationDocument } from '../models';
import { ReservationsRepository } from './reservations.repository';

describe('ReservationsRepository', () => {
  let reservationsRepository: ReservationsRepository;
  let reservationsModel: Model<ReservationDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsRepository,
        {
          provide: getModelToken(ReservationDocument.name),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            find: jest.fn(),
            findOneAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    reservationsRepository = module.get<ReservationsRepository>(
      ReservationsRepository,
    );

    reservationsModel = module.get<Model<ReservationDocument>>(
      getModelToken(ReservationDocument.name),
    );
  });

  it('should be defined', () => {
    expect(reservationsRepository).toBeDefined();
    expect(reservationsModel).toBeDefined();
  });
});
