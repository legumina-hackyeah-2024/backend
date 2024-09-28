import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { FriendService } from './friend.service';
import { INPUT_KEY } from 'src/common/common.constraints';
import { FriendRequestModel } from './models/friend.model';
import { InjectUser } from 'src/common/decorators/user.decorator';
import { UserDocument } from 'src/user/schemas/user.schema';
import { FriendRequestInput } from './inputs/friend-request.input';
import { FriendRequestDecisionInput } from './inputs/friend-request-decision.input';
import { UserService } from 'src/user/user.service';

@Resolver(() => FriendRequestModel)
export class FriendResolver {
  constructor(
    private readonly friendService: FriendService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [FriendRequestModel], { name: 'friendsRequests' })
  async friendsRequests(@InjectUser() user: UserDocument) {
    return this.friendService.userFriendRequests(user._id.toString());
  }

  @Mutation(() => FriendRequestModel, { name: 'friendRequestSend' })
  async createFriendRequest(
    @InjectUser() user: UserDocument,
    @Args(INPUT_KEY) input: FriendRequestInput,
  ) {
    return this.friendService.create(user._id.toString(), input.username);
  }

  @Mutation(() => FriendRequestModel, { name: 'friendRequestDecision' })
  async friendRequestDecision(
    @InjectUser() user: UserDocument,
    @Args(INPUT_KEY) input: FriendRequestDecisionInput,
  ) {
    return await this.friendService.friendRequestDecision(
      user._id.toString(),
      input.id,
      input.decision,
    );
  }

  @ResolveField()
  async from(@Parent() friendRequest: FriendRequestModel) {
    return this.userService.getOneById(friendRequest.from.toString());
  }

  @ResolveField()
  async to(@Parent() friendRequest: FriendRequestModel) {
    return this.userService.getOneById(friendRequest.to.toString());
  }
}
