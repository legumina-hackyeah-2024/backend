import { Resolver, Query } from '@nestjs/graphql';
import { HeroService } from './hero.service';
import { HeroModel } from './models/hero.model';
import { Public } from 'src/common/decorators/public.decorator';

@Resolver()
export class HeroResolver {
  constructor(private readonly heroService: HeroService) {}

  /* @Public()
  @Query(() => HeroModel, { name: 'heros' })
  async getHero(@Args(INPUT_KEY) input: HeroInput) {
    return this.heroService.findById(input.id);
  }

  @Public()
  @Mutation(() => HeroModel, { name: 'hero' })
  async createHero(@Args(INPUT_KEY) input: HeroInput) {
    return this.heroService.create(input);
  } */

  @Public()
  @Query(() => [HeroModel], { name: 'heros' })
  async getHeros() {
    return this.heroService.findAll();
  }
}
