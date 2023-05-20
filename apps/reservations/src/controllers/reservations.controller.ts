import { JwtAuthGuard, User, UserDto } from '@app/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateReservationDto, UpdateReservationDto } from '../dto';
import type { ReservationDocument } from '../models';
import { ReservationsService } from '../services';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  public async create(
    @Body() createReservationDto: CreateReservationDto,
    @User() user: UserDto,
  ): Promise<ReservationDocument> {
    return this.reservationsService.create(createReservationDto, user._id);
  }

  @Get()
  public async findAll(): Promise<ReservationDocument[]> {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<ReservationDocument> {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ): Promise<ReservationDocument> {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<ReservationDocument> {
    return this.reservationsService.remove(id);
  }
}
