import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FriendRequestInput {
  @Field()
  username: string;
}
