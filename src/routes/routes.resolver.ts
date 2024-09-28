import { Resolver, Query, Args } from '@nestjs/graphql';
import { RoutesService } from './routes.service';
import { RoutesModel } from './models/routes.model';
import { RoutesInput } from './inputs/routes.input';
import { Public } from 'src/common/decorators/public.decorator';
import { INPUT_KEY } from 'src/common/common.constraints';

@Resolver()
export class RoutesResolver {
  constructor(private readonly routesService: RoutesService) { }

  @Public()
  @Query(() => RoutesModel, { name: 'routes' })
  async getRoutes(@Args(INPUT_KEY) input: RoutesInput) {
    return this.routesService.findById(input.id);
  }
}
