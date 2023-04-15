import type { Logger } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import type { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Types } from 'mongoose';
import type { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<T extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<T>) {}

  public async create(data: Omit<T, '_id'>): Promise<T> {
    const createdDocument = new this.model({
      ...data,
      _id: new Types.ObjectId(),
    });

    return (await createdDocument.save()).toJSON() as unknown as T;
  }

  public async findOne(filterQuery: FilterQuery<T>): Promise<T> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);

      throw new NotFoundException('Document not found');
    }

    return document;
  }

  public async findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    data: UpdateQuery<T>,
  ): Promise<T> {
    const document = await this.model.findOneAndUpdate(filterQuery, data, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);

      throw new NotFoundException('Document not found');
    }

    return document;
  }

  public async find(filterQuery: FilterQuery<T>): Promise<T[]> {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  public async findOneAndDelete(filterQuery: FilterQuery<T>): Promise<T> {
    const document = await this.model.findOneAndDelete(filterQuery, {
      lean: true,
    });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);

      throw new NotFoundException('Document not found');
    }

    return document;
  }
}
