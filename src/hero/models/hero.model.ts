import { Field, ObjectType } from '@nestjs/graphql';
import { HeroDocument } from '../schemas/hero.schema';

@ObjectType('')
export class HeroModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string

  @Field(() => String)
  description: string

  @Field(() => String)
  picture: string

  @Field(() => String)
  excerpt: string

  constructor(input: HeroDocument | HeroModel) {
    Object.assign(this, {
      ...((input as any)._doc ? (input as HeroDocument).toObject({ virtuals: true }) : input),
    });
  }
}
