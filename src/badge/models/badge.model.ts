import { Field, ObjectType } from '@nestjs/graphql';
import { BadgeDocument } from '../schemas/badge.schema';
import { Types } from 'mongoose';

@ObjectType('')
export class BadgeModel {
  _id: Types.ObjectId;
  @Field(() => String)
  id: string;

  @Field()
  name: string;

  @Field()
  picture: string;

  constructor(input: BadgeDocument | BadgeModel) {
    Object.assign(this, {
      ...((input as any)._doc
        ? (input as BadgeDocument).toObject({ virtuals: true })
        : input),
    });
  }
}
