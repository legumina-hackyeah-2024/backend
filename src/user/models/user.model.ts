import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from '../enums/user-type.enum';
import { UserAuthType } from '../enums/user-auth-type.enum';

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

  @Field()
  picture: string;

  @Field(() => UserType)
  type: UserType;

  @Field(() => [UserAuthType])
  authType: UserAuthType[];
}
