import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { decode } from 'jsonwebtoken';

import { IS_PUBLIC_KEY } from '../../common/decorators/public.decorator';
import { UserType } from '../../user/enums/user-type.enum';
import { UnauthenticatedError } from 'src/common/errors/unauthenticated.error';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    const { req } = ctx.getContext();
    if (isPublic) {
      if (req.headers.authorization !== undefined) {
        const { userId, userType } = decode(
          req.headers.authorization.split(' ')[1],
        ) as {
          userId: string;
          userType: UserType;
        };
        req.user = { id: userId, userType };
      }
      return true;
    }

    try {
      if (await super.canActivate(new ExecutionContextHost([req]))) {
        const userTypes = this.reflector.get<UserType[]>(
          'userTypes',
          context.getHandler(),
        );
        if (userTypes?.length && !userTypes.includes(req.user.userType)) {
          return false;
        }
        return true;
      }
      return false;
    } catch (err) {
      throw new UnauthenticatedError();
    }
  }
}
