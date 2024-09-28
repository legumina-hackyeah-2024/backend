import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from '../enums/user-type.enum';
import { UserAuthType } from '../enums/user-auth-type.enum';
import { BadgeModel } from 'src/badge/models/badge.model';
import { PointModel, RoutesModel } from 'src/routes/models/routes.model';
import { RouteStatus } from '../enums/route-status.enum';

@ObjectType()
export class ProgressOfRouteModel {
  @Field(() => String)
  routeId: string;

  @Field(() => Number)
  currentPointIdx: number

  @Field(() => RouteStatus)
  status: RouteStatus;
}
