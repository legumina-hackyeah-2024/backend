import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Hero, HeroDocument } from './schemas/hero.schema';

@Injectable()
export class HeroRepository {
  constructor(
    @InjectModel(Hero.name) private readonly heroModel: Model<HeroDocument>,
  ) {}

  async create(input: Partial<HeroDocument>): Promise<Hero> {
    return this.heroModel.create(input);
  }

  async findOneById(id: string): Promise<Hero | null> {
    return this.heroModel.findById(id);
  }

  async findAll() {
    return this.heroModel.find();
  }
}
