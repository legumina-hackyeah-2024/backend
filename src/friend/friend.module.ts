import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendRepository } from './friend.repository';
import { FriendRequest, FriendRequestSchema } from './schemas/friend.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendResolver } from './friend.resolver';
import { UserModule } from 'src/user/user.module';
import { UserInjectModule } from 'src/user-inject/user-inject.module';

@Module({
  imports: [
    UserModule,
    UserInjectModule,
    MongooseModule.forFeature([
      { name: FriendRequest.name, schema: FriendRequestSchema },
    ]),
  ],
  providers: [FriendService, FriendRepository, FriendResolver],
  exports: [FriendService],
})
export class FriendModule {}
