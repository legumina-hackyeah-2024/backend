import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDocument, User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) { }

  async create(input: Partial<UserDocument>): Promise<User> {
    return this.repository.create(input);
  }

  async upsert(input: Partial<UserDocument>): Promise<User> {
    return this.repository.upsert(input);
  }

  async addFriend(userId: string, friendId: string) {
    return this.repository.addFriend(userId, friendId);
  }

  async removeFriend(userId: string, friendId: string) {
    return this.repository.removeFriend(userId, friendId);
  }

  async getFriends(userId: string): Promise<User[]> {
    return this.repository.getFriends(userId);
  }

  async addBadge(userId: string, badgeId: string): Promise<User> {
    return this.repository.addBadge(userId, badgeId);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.repository.findOneByEmail(email);
  }

  async findOneById(id: string): Promise<User> {
    return this.repository.findOneById(id);
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.repository.findOneByUsername(username);
  }

  async getOneByUsername(username: string) {
    return this.repository.getOneByUsername(username);
  }

  async getOneById(id: string): Promise<User> {
    return this.repository.getOneById(id);
  }

  async getOneByEmail(email: string): Promise<User> {
    return this.repository.getOneByEmail(email);
  }

  async deleteOneById(id: string): Promise<User> {
    return this.repository.deleteOneById(id);
  }

  async updateProgressOfRoute(userId: string, routeId: string, pointIdx: number): Promise<User> {
    return this.repository.updateProgressOfRoute(userId, routeId, pointIdx);
  }
}
