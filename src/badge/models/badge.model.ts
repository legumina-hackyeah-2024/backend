import { Field, ObjectType } from '@nestjs/graphql';
import { BadgeDocument } from '../schemas/badge.schema';

@ObjectType('')
export class BadgeModel {
  @Field(()=>String)
  id: string;

  constructor(input: BadgeDocument | BadgeModel) {
    Object.assign(this, {
      ...((input as any)._doc ? (input as BadgeDocument).toObject({ virtuals: true }) : input),
    });
  }
}
