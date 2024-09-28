import { Injectable } from '@nestjs/common';
import { Badge, BadgeDocument } from './schemas/badge.schema';
import { BadgeRepository } from './badge.repository';
import { BadgeNotFoundError } from './errors/badge-not-found.error';

@Injectable()
export class BadgeService {
  constructor(private readonly repository: BadgeRepository) {}

  async create(input: Partial<BadgeDocument>): Promise<Badge> {
    return this.repository.create(input);
  }

  async findById(id: string): Promise<Badge> {
    return await this.repository.findOneById(id);
  }

  async getById(id: string): Promise<Badge> {
    const badge = await this.findById(id);
    if (!badge) {
      throw new BadgeNotFoundError();
    }
    return badge;
  }
}
