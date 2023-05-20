import { Injectable } from '@nestjs/common';
import type { CreateReservationDto, UpdateReservationDto } from '../dto';
import type { ReservationDocument } from '../models';
import { ReservationsRepository } from '../providers';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  public async create(
    createReservationDto: CreateReservationDto,
    userId: string,
  ): Promise<ReservationDocument> {
    return this.reservationsRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId,
    });
  }

  public async findAll(): Promise<ReservationDocument[]> {
    return this.reservationsRepository.find({});
  }

  public async findOne(_id: string): Promise<ReservationDocument> {
    return this.reservationsRepository.findOne({ _id });
  }

  public async update(
    _id: string,
    updateReservationDto: UpdateReservationDto,
  ): Promise<ReservationDocument> {
    return this.reservationsRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  public async remove(_id: string): Promise<ReservationDocument> {
    return this.reservationsRepository.findOneAndDelete({ _id });
  }
}
