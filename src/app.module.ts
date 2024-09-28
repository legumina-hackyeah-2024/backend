import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseConfig } from './config/database.config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { ServerConfig } from './config/server.config';
import { formatError } from './utils/formatError';
import { RoutesModule } from './routes/routes.module';
import { BadgeModule } from './badge/badge.module';
import { HeroModule } from './hero/hero.module';
import { FriendModule } from './friend/friend.module';

@Module({
  imports: [
    AuthModule,
    RoutesModule,
    BadgeModule,
    HeroModule,
    FriendModule,
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      driver: ApolloDriver,
      useFactory: (serverConfig: ServerConfig) => ({
        autoSchemaFile: 'schema.gql',
        formatError,
        introspection: serverConfig.getEnableIntrospection(),
        playground: serverConfig.getEnablePlayground(),
      }),
      inject: [ServerConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: DatabaseConfig,
    }),
  ],
  providers: [AppResolver, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
