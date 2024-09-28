import { InjectUser } from 'src/common/decorators/user.decorator';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BadgeService } from 'src/badge/badge.service';
import { UserModel } from './models/user.model';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly badgeService: BadgeService,
  ) {}

  @Query(() => UserModel)
  async userMe(@InjectUser() user: User) {
    return this.userService.findOneById(user._id.toString());
  }

  @ResolveField()
  async badges(@Parent() user: UserModel) {
    return this.badgeService.findAllById(
      user.badges.map((i) => i._id.toString()),
    );
  }

  @ResolveField()
  async distance(@Parent() user: UserModel) {
    user;
    return ((Math.random() * (150 - 8) + 8) / 10).toFixed(2);
  }

  @ResolveField()
  async time(@Parent() user: UserModel) {
    user;
    const minutes = Math.random() * (59 - 0) + 0;
    const hours = Math.random() * (4 - 0) + 0;
    return `${Math.floor(hours)}:${Math.floor(minutes).toString().padStart(2, '0')}`;
  }

  @ResolveField()
  async completedRoutes(@Parent() user: UserModel) {
    user;
    //TODO: calculate it somehow???
    return 0;
  }

  @ResolveField()
  async friends(@Parent() user: any) {
    return this.userService.getFriends(user._id.toString());
  }
}
