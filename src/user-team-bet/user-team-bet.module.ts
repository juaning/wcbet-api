import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTeamBet } from 'src/model/userTeamBet.entity';
import { ApiWc2022Module } from '../api-wc2022/api-wc2022.module';
import { UserTeamBetController } from './user-team-bet.controller';
import { UserTeamBetService } from './user-team-bet.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTeamBet]),
    HttpModule,
    ApiWc2022Module,
  ],
  controllers: [UserTeamBetController],
  providers: [UserTeamBetService],
  exports: [TypeOrmModule, UserTeamBetService],
})
export class UserTeamBetModule {}
