import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroRepository } from './hero.repository';
import { Hero, HeroSchema } from './schemas/hero.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroResolver } from './hero.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hero.name, schema: HeroSchema }]),
  ],
  providers: [HeroService, HeroRepository, HeroResolver],
  exports: [HeroService],
})
export class HeroModule {}
