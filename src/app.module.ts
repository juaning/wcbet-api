import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiWc2022Module } from './api-wc2022/api-wc2022.module';
import { configService } from './config/config.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { UserMatchBetModule } from './user-match-bet/user-match-bet.module';
import { AuthzModule } from './authz/authz.module';
import { UserTeamBetModule } from './user-team-bet/user-team-bet.module';
// import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';
import { ttl5min } from './config/common';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      // store: redisStore,
      // host: process.env.REDIS_HOST,
      // port: process.env.REDIS_PORT,
      ttl: ttl5min,
      max: 200, // keys in store
    }),
    HttpModule,
    ApiWc2022Module,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    UserMatchBetModule,
    AuthzModule,
    UserTeamBetModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
