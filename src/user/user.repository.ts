import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UserNotFoundError } from './errors/user-not-found.error';
import { Routes } from 'src/routes/schemas/routes.schema';
import { RouteStatus } from './enums/route-status.enum';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) { }

  async create(input: Partial<UserDocument>): Promise<User> {
    return this.userModel.create(input);
  }

  async addBadge(userId: string, badgeId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UserNotFoundError();
    }
    if (user.badges.includes(new Types.ObjectId(badgeId))) {
      throw new Error('Badge already exists');
    }

    user.badges.push(new Types.ObjectId(badgeId));
    return user.save();
  }

  async upsert(entity: Partial<UserDocument>): Promise<User> {
    const _id = entity.id || new Types.ObjectId();
    const update = { $set: entity };

    const options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    };

    const upsertedDocument = await this.userModel
      .findOneAndUpdate({ _id }, update, options)
      .exec();

    if (!upsertedDocument) {
      throw new Error('Upsert operation failed');
    }

    return upsertedDocument;
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async findOneById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async getOneById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async getOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async getOneByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async deleteOneById(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }

  async updateProgressOfRoute(userId: string, routeId: string, pointIdx: number): Promise<User> {
    const u = await this.userModel.findOneAndUpdate(
      { _id: userId, 'progressOfRoutes.routeId': routeId },
      {
        $set: {
          'progressOfRoutes.$.currentPointIdx': pointIdx + 1,
        },
      }
    );

    console.log(u)

    return u;
  }

  async addFriend(userId: string, friendId: string) {
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $push: { friends: friendId },
      },
    );
    await this.userModel.findOneAndUpdate(
      { _id: friendId },
      {
        $push: { friends: userId },
      },
    );
  }

  async removeFriend(userId: string, friendId: string): Promise<User> {
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { friends: friendId } },
    );
    return this.userModel.findOneAndUpdate(
      { _id: friendId },
      { $pull: { friends: userId } },
    );
  }

  async getFriends(userId: string): Promise<User[]> {
    const user = await this.userModel.findById(userId);
    const friends = await this.userModel.find({
      _id: { $in: user.friends },
    });
    return friends;
  }
}
