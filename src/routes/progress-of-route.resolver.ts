import { InjectUser } from 'src/common/decorators/user.decorator';
import { User } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BadgeService } from 'src/badge/badge.service';
import { UserModel } from '../user/models/user.model';
import { ProgressOfRouteModel } from '../user/models/progres-of-route.model';
import { INPUT_KEY } from 'src/common/common.constraints';
import { ProgresOfRouteInput } from '../user/inputs/progres-of-route.input';
import { RoutesService } from './routes.service';
import { PointModel, RoutesModel } from './models/routes.model';

@Resolver(() => ProgressOfRouteModel)
export class ProgressOfRouteResolver {
  constructor(private readonly routeServices: RoutesService) { }

  @ResolveField(() => RoutesModel)
  async route(
    @Parent() parent: ProgressOfRouteModel,
  ) {
    return this.routeServices.findById(parent.routeId);
  }

  @ResolveField(() => PointModel)
  async currentPoint(
    @Parent() parent: ProgressOfRouteModel,
  ) {
    const route = await this.routeServices.findById(parent.routeId);

    return route.points[parent.currentPointIdx];
  }
}
