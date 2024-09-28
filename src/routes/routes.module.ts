import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesRepository } from './routes.repository';
import { Routes, RoutesSchema } from './schemas/routes.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RoutesResolver } from './routes.resolver';
import { ProgressOfRouteResolver } from './progress-of-route.resolver';
import { CompletedRouteResolver } from './completed-route.resolver';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: Routes.name, schema: RoutesSchema }]),
    ],
    providers: [RoutesService, RoutesRepository, RoutesResolver, ProgressOfRouteResolver, CompletedRouteResolver],
    exports: [RoutesService],
})
export class RoutesModule { }