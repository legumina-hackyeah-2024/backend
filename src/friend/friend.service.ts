import { Injectable } from '@nestjs/common';
import { FriendRepository } from './friend.repository';
import { FriendNotFoundError } from './errors/friend-not-found.error';
import { UserService } from 'src/user/user.service';
import { FriendCannotDecideOwnRequest } from './errors/friend-can-not-decide-own-request.error';

@Injectable()
export class FriendService {
  constructor(
    private readonly repository: FriendRepository,
    private readonly userService: UserService,
  ) {}

  async create(userId: string, to: string) {
    const userToSendRequestTo = await this.userService.getOneByUsername(to);
    return this.repository.create(userId, userToSendRequestTo._id.toString());
  }

  async userFriendRequests(userId: string) {
    return this.repository.userFriendRequests(userId);
  }

  async friendRequestDecision(
    userId: string,
    requestId: string,
    decision: boolean,
  ) {
    const friendRequest = await this.getById(requestId);
    console.log(friendRequest, userId);
    if (friendRequest.to.toString() !== userId) {
      throw new Error('You can not decide own request');
    }

    if (decision) {
      await this.repository.acceptFriendRequest(friendRequest._id.toString());
      await this.userService.addFriend(
        friendRequest.to.toString(),
        friendRequest.from.toString(),
      );
    } else {
      await this.repository.rejectFriendRequest(friendRequest._id.toString());
    }

    return friendRequest;
  }

  async findById(id: string) {
    return await this.repository.findOneById(id);
  }

  async getById(id: string) {
    const friend = await this.findById(id);
    if (!friend) {
      throw new FriendNotFoundError();
    }
    return friend;
  }
}
