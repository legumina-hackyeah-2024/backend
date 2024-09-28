import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FriendRequest, FriendRequestDocument } from './schemas/friend.schema';
import { FriendRequestStatus } from './friend-request.status';

@Injectable()
export class FriendRepository {
  constructor(
    @InjectModel(FriendRequest.name)
    private readonly friendModel: Model<FriendRequestDocument>,
  ) {}

  async create(from: string, to: string): Promise<FriendRequest> {
    return this.friendModel.create({
      from: from,
      to: to,
    });
  }

  async userFriendRequests(userId: string): Promise<FriendRequest[]> {
    return this.friendModel.find({
      $or: [{ from: userId }, { to: userId }],
      status: FriendRequestStatus.PENDING,
    });
  }

  async findOneById(id: string): Promise<FriendRequest | null> {
    return this.friendModel.findById(id);
  }

  async acceptFriendRequest(friendRequestId: string) {
    return this.friendModel.updateOne(
      {
        _id: friendRequestId,
      },
      {
        status: FriendRequestStatus.ACCEPTED,
      },
      { new: true },
    );
  }

  async rejectFriendRequest(friendRequestId: string) {
    return this.friendModel.updateOne(
      {
        _id: friendRequestId,
      },
      {
        status: FriendRequestStatus.REJECTED,
      },
      { new: true },
    );
  }
}
