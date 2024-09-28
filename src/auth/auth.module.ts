import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import { GoogleStrategy } from './strategy/google.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { TokenService } from './token.service';
import { TokenSchema, Token } from './schemas/token.schema';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthConfig } from 'src/config/auth.config';
import { UserInjectModule } from 'src/user-inject/user-inject.module';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    ConfigModule,
    UserModule,
    UserInjectModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: AuthConfig) => ({
        secret: config.getJwtSecret(),
        signOptions: {
          expiresIn: `${config.getTokenExpirationTime()}h`,
        },
      }),
      inject: [AuthConfig],
    }),
  ],
  providers: [
    AuthService,
    GoogleStrategy,
    JwtStrategy,
    TokenService,
    AuthResolver,
  ],
  exports: [AuthService],
})
export class AuthModule {}
