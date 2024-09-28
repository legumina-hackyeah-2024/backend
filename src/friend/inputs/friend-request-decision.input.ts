import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class FriendRequestDecisionInput {
  @Field()
  @IsMongoId()
  id: string;

  @Field()
  decision: boolean;
}
