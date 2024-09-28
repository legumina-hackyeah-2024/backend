import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GoogleStrategy } from './strategy/google.strategy';
import { Public } from 'src/common/decorators/public.decorator';
import { GoogleAuthInput } from './inputs/auth-google.input';
import { GoogleNoUserError } from './errors/google-no-user.error';
import { AuthSignInResponse } from './response/auth-sign-in.response';
import { AuthService } from './auth.service';
import { UserModel } from 'src/user/models/user.model';
import { AuthRegisterInput } from './inputs/auth-register.input';
import { AuthLoginInput } from './inputs/auth-login.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => AuthSignInResponse, {
    name: 'authGoogleLogin',
  })
  async authWithGoogle(@Args('input') input: GoogleAuthInput) {
    if (!input.code && !input.accessToken) {
      throw new Error('You must provide either code or access token');
    }
    const googleStrategy = new GoogleStrategy();
    // let userData: {given_name: string; family_name: string, email: string} = {};
    if (input.code) {
      const userData = await googleStrategy.getUserDataWithCode(
        decodeURIComponent(input.code),
      );
      if (!userData) {
        throw new GoogleNoUserError();
      }
      return await this.authService.googleLogin(
        userData.given_name,
        userData.family_name,
        userData.email,
        input.username,
      );
    }
    if (input.accessToken) {
      const userData = await googleStrategy.getUserDataWithAccessToken(
        input.accessToken,
      );
      if (!userData) {
        throw new GoogleNoUserError();
      }
      return await this.authService.googleLogin(
        userData.given_name,
        userData.family_name,
        userData.email,
        input.username,
      );
    }
  }

  @Public()
  @Mutation(() => UserModel)
  async authRegister(@Args('input') input: AuthRegisterInput) {
    return await this.authService.register(input);
  }

  @Public()
  @Mutation(() => AuthSignInResponse)
  async authLogin(@Args('input') input: AuthLoginInput) {
    return await this.authService.login(input);
  }
}
