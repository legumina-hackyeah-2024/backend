import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthTokenPair } from './interfaces/token.interface';
import { hash as bcryptHash, compare } from 'bcrypt';
import { TokenService } from './token.service';
import { AuthConfig } from 'src/config/auth.config';
import { AuthSignInResponse } from './response/auth-sign-in.response';
import { AuthRegisterInput } from './inputs/auth-register.input';
import { AuthLoginInput } from './inputs/auth-login.input';
import { UserAuthType } from 'src/user/enums/user-auth-type.enum';
import { AuthUsernameNotProvidedError } from './errors/auth-username-not-provided.error';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly config: AuthConfig,
  ) {}

  async validateUser(id: string): Promise<User> {
    return this.userService.getOneById(id);
  }

  async register(input: AuthRegisterInput): Promise<User> {
    const user = await this.userService.findOneByEmail(input.email);
    const userByUsername = await this.userService.findOneByUsername(
      input.username,
    );
    if (user || userByUsername) {
      throw new UnauthorizedException(
        'User with this email/username already exists',
      );
    }
    const userParsed: Partial<User> = {
      username: input.username,
      email: input.email,
      hash: await bcryptHash(input.password, this.config.getSaltRounds()),
      authType: [UserAuthType.Local],
    };
    return this.userService.create(userParsed);
  }

  async login(input: AuthLoginInput): Promise<AuthTokenPair> {
    const user = await this.userService.getOneByEmail(input.email);
    if (!user.hash) {
      throw new UnauthorizedException(
        'This method of authentication is not supported for this user',
      );
    }
    const isPasswordValid = await compare(input.password, user.hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return this.tokenService.generateTokens(user._id.toString(), user.type);
  }

  async googleLogin(
    name: string,
    surname: string,
    email: string,
    username?: string,
  ) {
    const existUser = await this.userService.findOneByEmail(email);
    if (username) {
      const existUserByUsername =
        await this.userService.findOneByUsername(username);
      if (existUserByUsername) {
        throw new UnauthorizedException(
          'User with this username already exists',
        );
      }
    }
    if (!existUser && !username) {
      throw new AuthUsernameNotProvidedError();
    }
    if (!existUser) {
      const password = new Date().getTime().toString();
      const hash = await bcryptHash(password, this.config.getSaltRounds());
      const createUserPayload = {
        username,
        email,
        hash,
        lastActivityAt: new Date(),
        authType: [UserAuthType.Google],
      };
      const user = await this.userService.create(createUserPayload);
      const sessionToken = this.tokenService.generateSessionToken(
        user._id.toString(),
        user.type,
      );
      const refreshToken = await this.tokenService.generateRefreshToken(
        user._id.toString(),
      );
      return new AuthSignInResponse(sessionToken, refreshToken);
    }

    const sessionToken = this.tokenService.generateSessionToken(
      existUser._id.toString(),
      existUser.type,
    );
    const refreshToken = await this.tokenService.generateRefreshToken(
      existUser._id.toString(),
    );
    return new AuthSignInResponse(sessionToken, refreshToken);
  }
}
