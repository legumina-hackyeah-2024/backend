import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UserFriendInput {
  @Field()
  @IsString()
  username: string;
}
