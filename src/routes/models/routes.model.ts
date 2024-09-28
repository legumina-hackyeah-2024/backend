import { Field, Int, ObjectType } from '@nestjs/graphql';
import { RoutesDocument } from '../schemas/routes.schema';

@ObjectType('')
export class PointModel {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Number)
  lat: number

  @Field(() => Number)
  lng: number

  @Field(() => String)
  question: string

  @Field(() => [String])
  answers: string[]
}

@ObjectType('')
export class RoutesModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  heroId: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  icon: string;

  @Field(() => Number, { description: "Distance in kilometers" })
  distance: number

  @Field(() => Int)
  difficulty: number

  @Field(() => Number)
  lat: number

  @Field(() => Number)
  lng: number

  @Field(() => [String])
  facilities: string[]

  @Field(() => [PointModel])
  points: PointModel[]

  constructor(input: RoutesDocument | RoutesModel) {
    Object.assign(this, {
      ...((input as any)._doc ? (input as RoutesDocument).toObject({ virtuals: true }) : input),
    });
  }
}
