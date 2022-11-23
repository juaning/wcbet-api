import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/model/user.entity';
import { ApiWc2022Module } from '../api-wc2022/api-wc2022.module';
import { UserMatchBetModule } from '../user-match-bet/user-match-bet.module';
import { HttpModule } from '@nestjs/axios';
import { UserTeamBetModule } from '../user-team-bet/user-team-bet.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    HttpModule,
    ApiWc2022Module,
    UserMatchBetModule,
    UserTeamBetModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
