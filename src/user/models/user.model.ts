import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from '../enums/user-type.enum';
import { UserAuthType } from '../enums/user-auth-type.enum';
import { BadgeModel } from 'src/badge/models/badge.model';

@ObjectType()
export class UserModel {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  picture: string;

  @Field(() => UserType)
  type: UserType;

  @Field(() => [UserAuthType])
  authType: UserAuthType[];

  @Field(() => [BadgeModel])
  badges: BadgeModel[];

  @Field()
  distance: number;

  @Field()
  time: string;

  @Field()
  completedRoutes: number;
}
