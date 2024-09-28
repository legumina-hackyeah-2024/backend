import { Field, ObjectType } from '@nestjs/graphql';
import { HeroDocument } from '../schemas/hero.schema';

@ObjectType('')
export class HeroModel {
  @Field(()=>String)
  id: string;

  constructor(input: HeroDocument | HeroModel) {
    Object.assign(this, {
      ...((input as any)._doc ? (input as HeroDocument).toObject({ virtuals: true }) : input),
    });
  }
}
