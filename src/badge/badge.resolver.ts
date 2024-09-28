import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BadgeService } from './badge.service';
import { BadgeModel } from './models/badge.model';
import { BadgeInput } from './inputs/badge.input';
import { INPUT_KEY } from 'src/common/common.constraints';
import { Public } from 'src/common/decorators/public.decorator';

@Resolver()
export class BadgeResolver {
  constructor(private readonly badgeService: BadgeService) {}

  @Public()
  @Query(() => BadgeModel, { name: 'badges' })
  async getBadge(@Args(INPUT_KEY) input: BadgeInput) {
    return this.badgeService.findById(input.id);
  }

  @Public()
  @Mutation(() => BadgeModel, { name: 'badge' })
  async createBadge(@Args(INPUT_KEY) input: BadgeInput) {
    return this.badgeService.create(input);
  }
}
