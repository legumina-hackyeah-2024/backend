import { Field, ObjectType } from '@nestjs/graphql';
import { RoutesDocument } from '../schemas/routes.schema';

@ObjectType('')
export class RoutesModel {
  @Field(()=>String)
  id: string;

  constructor(input: RoutesDocument | RoutesModel) {
    Object.assign(this, {
      ...((input as any)._doc ? (input as RoutesDocument).toObject({ virtuals: true }) : input),
    });
  }
}
