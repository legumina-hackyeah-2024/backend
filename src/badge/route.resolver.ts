import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { BadgeService } from './badge.service';
import { BadgeModel } from './models/badge.model';
import { BadgeInput } from './inputs/badge.input';
import { INPUT_KEY } from 'src/common/common.constraints';
import { Public } from 'src/common/decorators/public.decorator';
import { RoutesModel } from 'src/routes/models/routes.model';

@Resolver(() => RoutesModel)
export class RouteResolver {
  constructor(private readonly badgeService: BadgeService) { }

  @Public()
  @ResolveField(() => BadgeModel, { name: 'badge' })
  async badge(@Parent() parent: RoutesModel) {
    return this.badgeService.findById(parent.badgeId);
  }
}
