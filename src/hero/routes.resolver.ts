import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { HeroService } from './hero.service';
import { HeroModel } from './models/hero.model';
import { Public } from 'src/common/decorators/public.decorator';
import { RoutesModel } from 'src/routes/models/routes.model';

@Resolver(() => RoutesModel)
export class RoutesResolver {
  constructor(private readonly heroService: HeroService) { }

  @Public()
  @ResolveField(() => HeroModel, { name: 'hero' })
  async hero(@Parent() parent: RoutesModel) {
    return this.heroService.findById(parent.heroId);
  }
}
