import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from '../enums/user-type.enum';
import { UserAuthType } from '../enums/user-auth-type.enum';
import { BadgeModel } from 'src/badge/models/badge.model';
import { RouteStatus } from '../enums/route-status.enum';
import { ProgressOfRouteModel } from './progres-of-route.model';
import { CompletedRouteModel } from 'src/routes/models/completed-route.model';

@ObjectType()
export class UserModel {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  picture: string;

  @Field(() => UserType)
  type: UserType;

  @Field(() => [UserAuthType])
  authType: UserAuthType[];

  @Field(() => [BadgeModel])
  badges: BadgeModel[];

  @Field(() => [UserModel])
  friends: UserModel[];

  @Field()
  distance: number;

  @Field()
  time: string;

  @Field(() => [CompletedRouteModel])
  completedRoutes: CompletedRouteModel[];

  @Field(() => [ProgressOfRouteModel])
  progressOfRoutes: ProgressOfRouteModel[];
}

