import { Injectable } from '@nestjs/common';
import { Routes, RoutesDocument } from './schemas/routes.schema';
import { RoutesRepository } from './routes.repository';
import { RoutesNotFoundError } from './errors/routes-not-found.error';


@Injectable()
export class RoutesService {
  constructor(private readonly repository: RoutesRepository) { }

  async findAll(): Promise<Routes[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<Routes> {
    return await this.repository.findOneById(id);
  }

  async getById(id: string): Promise<Routes> {
    const routes = await this.findById(id);
    if (!routes) {
      throw new RoutesNotFoundError();
    }
    return routes;
  }
}
