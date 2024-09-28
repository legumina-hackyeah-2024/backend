import { Field, ObjectType } from '@nestjs/graphql';
import { FriendRequestStatus } from '../friend-request.status';
import { UserModel } from 'src/user/models/user.model';
import { FriendRequestDocument } from '../schemas/friend.schema';

@ObjectType('')
export class FriendRequestModel {
  @Field(() => String)
  id: string;

  @Field(() => FriendRequestStatus)
  status: FriendRequestStatus;

  @Field(() => UserModel)
  from: UserModel;

  @Field(() => UserModel)
  to: UserModel;

  constructor(input: FriendRequestDocument | FriendRequestModel) {
    Object.assign(this, {
      ...((input as any)._doc
        ? (input as FriendRequestDocument).toObject({ virtuals: true })
        : input),
    });
  }
}
