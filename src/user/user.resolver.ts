import { InjectUser } from 'src/common/decorators/user.decorator';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BadgeService } from 'src/badge/badge.service';
import { UserModel } from './models/user.model';
import { ProgressOfRouteModel } from './models/progres-of-route.model';
import { INPUT_KEY } from 'src/common/common.constraints';
import { ProgresOfRouteInput } from './inputs/progres-of-route.input';
import { AnswerInput } from './inputs/answer.input';
import { RoutesService } from 'src/routes/routes.service';
import { PointIsNotAvailableYetError } from './errors/point-is-not-available-yet.error';
import { InvalidPointIndexError } from './errors/invalid-point-index.error copy';
import { AnswerIsNotCorrectError } from './errors/answer-is-not-correct.error';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly badgeService: BadgeService,
    private readonly routeService: RoutesService
  ) { }

  @Query(() => UserModel)
  async userMe(@InjectUser() user: User) {
    return this.userService.findOneById(user._id.toString());
  }

  @Mutation(() => UserModel)
  async answer(
    @InjectUser() user: User,
    @Args(INPUT_KEY) args: AnswerInput
  ) {
    const u = await this.userService.findOneById(user._id.toString());

    const progressOfRoute = u.progressOfRoutes?.find(({ routeId }) => routeId.toString() === args.routeId);
    if (progressOfRoute.currentPointIdx && progressOfRoute.currentPointIdx !== args.pointIdx) {
      throw new PointIsNotAvailableYetError();
    }

    const route = await this.routeService.findById(args.routeId);
    if (args.pointIdx < 0 || args.pointIdx >= route.points.length) {
      throw new InvalidPointIndexError();
    }

    const point = route.points[args.pointIdx];
    if (point.correctAnswerIdx !== args.answerIdx) {
      throw new AnswerIsNotCorrectError();
    }

    const completed = args.pointIdx === route.points.length - 1;
    return completed
      ? await this.userService.completeRoute(user._id.toString(), args.routeId)
      : await this.userService.updateProgressOfRoute(user._id.toString(), args.routeId, args.pointIdx);
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

  @ResolveField(() => ProgressOfRouteModel, { nullable: true })
  async progressOfRoute(
    @Parent() user: UserModel,
    @Args(INPUT_KEY) args: ProgresOfRouteInput
  ) {
    const route = user.progressOfRoutes?.find(({ routeId }) => routeId.toString() === args.routeId);

    return route ?? null;
  }

  @ResolveField()
  async friends(@Parent() user: any) {
    return this.userService.getFriends(user._id.toString());
  }
}
