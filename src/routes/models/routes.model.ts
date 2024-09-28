import { Field, ObjectType } from '@nestjs/graphql';
import { RoutesDocument } from '../schemas/routes.schema';

@ObjectType('')
export class RoutesModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  icon: string;

  @Field(() => Number)
  distance: number

  @Field(() => Number)
  difficulty: number

  @Field(() => Number)
  lat: number

  @Field(() => Number)
  lng: number

  constructor(input: RoutesDocument | RoutesModel) {
    Object.assign(this, {
      ...((input as any)._doc ? (input as RoutesDocument).toObject({ virtuals: true }) : input),
    });
  }
}
