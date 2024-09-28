import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesRepository } from './routes.repository';
import { Routes, RoutesSchema } from './schemas/routes.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RoutesResolver } from './routes.resolver';

@Module({
imports: [
    MongooseModule.forFeature([{ name: Routes.name, schema: RoutesSchema }]),
    ],
    providers: [RoutesService, RoutesRepository, RoutesResolver],
    exports: [RoutesService],
})
export class RoutesModule {}