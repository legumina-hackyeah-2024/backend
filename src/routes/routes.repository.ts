import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Routes, RoutesDocument } from './schemas/routes.schema';

@Injectable()
export class RoutesRepository {
  constructor(
    @InjectModel(Routes.name) private readonly routesModel: Model<RoutesDocument>,
  ) { }

  async findAll(): Promise<Routes[]> {
    return this.routesModel.find();
  }

  async findOneById(id: string): Promise<Routes | null> {
    return this.routesModel.findById(id);
  }
}
