import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserResolver } from './user.resolver';
import { BadgeModule } from 'src/badge/badge.module';
import { UserInjectModule } from 'src/user-inject/user-inject.module';
import { RouterModule } from '@nestjs/core';
import { RoutesModule } from 'src/routes/routes.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    BadgeModule,
    UserInjectModule,
    RoutesModule,
  ],
  providers: [UserService, UserRepository, UserResolver],
  exports: [UserService],
})
export class UserModule { }
