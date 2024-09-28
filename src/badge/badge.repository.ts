import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Badge, BadgeDocument } from './schemas/badge.schema';

@Injectable()
export class BadgeRepository {
  constructor(
    @InjectModel(Badge.name) private readonly badgeModel: Model<BadgeDocument>,
  ) {}

  async create(input: Partial<BadgeDocument>): Promise<Badge> {
    return this.badgeModel.create(input);
  }

  async findOneById(id: string): Promise<Badge | null> {
    return this.badgeModel.findById(id);
  }

  async findAllById(ids: string[]): Promise<Badge[]> {
    return this.badgeModel.find({ _id: { $in: ids } });
  }
}
