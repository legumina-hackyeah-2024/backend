import { Module } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { BadgeRepository } from './badge.repository';
import { Badge, BadgeSchema } from './schemas/badge.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BadgeResolver } from './badge.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Badge.name, schema: BadgeSchema }]),
  ],
  providers: [BadgeService, BadgeRepository, BadgeResolver],
  exports: [BadgeService],
})
export class BadgeModule {}
