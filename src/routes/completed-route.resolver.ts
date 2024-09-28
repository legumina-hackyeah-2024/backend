import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { RoutesService } from './routes.service';
import { RoutesModel } from './models/routes.model';
import { RoutesInput } from './inputs/routes.input';
import { Public } from 'src/common/decorators/public.decorator';
import { INPUT_KEY } from 'src/common/common.constraints';
import { CompletedRouteModel } from './models/completed-route.model';

@Resolver(() => CompletedRouteModel)
export class CompletedRouteResolver {
  constructor(private readonly routesService: RoutesService) { }

  @Public()
  @ResolveField(() => RoutesModel, { name: 'route' })
  async route(@Parent() parent: CompletedRouteModel) {
    return this.routesService.getById(parent.routeId);
  }
}
