import { Injectable } from '@nestjs/common';
import { Hero, HeroDocument } from './schemas/hero.schema';
import { HeroRepository } from './hero.repository';
import { HeroNotFoundError } from './errors/hero-not-found.error';

@Injectable()
export class HeroService {
  constructor(private readonly repository: HeroRepository) {}

  async create(input: Partial<HeroDocument>): Promise<Hero> {
    return this.repository.create(input);
  }

  async findById(id: string): Promise<Hero> {
    return await this.repository.findOneById(id);
  }

  async getById(id: string): Promise<Hero> {
    const hero = await this.findById(id);
    if (!hero) {
      throw new HeroNotFoundError();
    }
    return hero;
  }

  async findAll(): Promise<Hero[]> {
    return this.repository.findAll();
  }
}
