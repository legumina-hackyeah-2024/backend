import { Field, Int, ObjectType } from '@nestjs/graphql';
import { RoutesDocument } from '../schemas/routes.schema';

@ObjectType('')
export class CompletedRouteModel {
  @Field(() => String)
  routeId: string;

  @Field(() => String)
  completedAt: Date;

  constructor(input: RoutesDocument | CompletedRouteModel) {
    Object.assign(this, {
      ...((input as any)._doc ? (input as RoutesDocument).toObject({ virtuals: true }) : input),
    });
  }
}
