import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { AuthConfig } from './auth.config';
import { DatabaseConfig } from './database.config';
import { validate } from './env.variables';
import { ServerConfig } from './server.config';
import { GoogleConfig } from './google.config';
import { ThrottlerConfig } from './throttler.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      validate,
    }),
  ],
  providers: [
    ServerConfig,
    DatabaseConfig,
    AuthConfig,
    GoogleConfig,
    ThrottlerConfig,
  ],
  exports: [
    ServerConfig,
    DatabaseConfig,
    AuthConfig,
    GoogleConfig,
    ThrottlerConfig,
  ],
})
export class ConfigModule {}
