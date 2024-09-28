import { registerEnumType } from '@nestjs/graphql';

import { UserType } from '../user/enums/user-type.enum';
import { GraphqlCommonErrors } from 'src/common/errors/graphql-common-errors';
import { Environment } from 'src/config/env.variables';
import { GraphqlAuthErrors } from 'src/auth/errors/graphql-auth.errors';
import { UserAuthType } from 'src/user/enums/user-auth-type.enum';
export const Errors = {
  ...GraphqlCommonErrors,
  ...GraphqlAuthErrors,
};

export const registerEnums = () => {
  registerEnumType(Errors, { name: 'Error' });
  registerEnumType(UserType, { name: 'UserType' });
  registerEnumType(Environment, { name: 'Environment' });
  registerEnumType(UserAuthType, { name: 'UserAuthType' });
};
