import { registerEnumType } from '@nestjs/graphql';

import { UserType } from '../user/enums/user-type.enum';
import { GraphqlCommonErrors } from 'src/common/errors/graphql-common-errors';
import { Environment } from 'src/config/env.variables';
import { GraphqlAuthErrors } from 'src/auth/errors/graphql-auth.errors';
import { UserAuthType } from 'src/user/enums/user-auth-type.enum';
import { GraphqlBadgeErrors } from 'src/badge/errors/graphql-badge-errors';
import { GraphqlUserErrors } from 'src/user/errors/graphql-user-errors';
import { RouteStatus } from 'src/user/enums/route-status.enum';
import { FriendRequestStatus } from 'src/friend/friend-request.status';
import { GraphqlFriendErrors } from 'src/friend/errors/graphql-friend-errors';

export const Errors = {
  ...GraphqlCommonErrors,
  ...GraphqlAuthErrors,
  ...GraphqlUserErrors,
  ...GraphqlBadgeErrors,
  ...GraphqlFriendErrors,
};

export const registerEnums = () => {
  registerEnumType(Errors, { name: 'Error' });
  registerEnumType(UserType, { name: 'UserType' });
  registerEnumType(Environment, { name: 'Environment' });
  registerEnumType(UserAuthType, { name: 'UserAuthType' });
  registerEnumType(RouteStatus, { name: 'RouteStatus' });
  registerEnumType(FriendRequestStatus, { name: 'FriendRequestStatus' });
};
