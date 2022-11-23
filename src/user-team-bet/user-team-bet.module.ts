import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTeamBet } from 'src/model/userTeamBet.entity';
import { UserTeamBetController } from './user-team-bet.controller';
import { UserTeamBetService } from './user-team-bet.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserTeamBet])],
  controllers: [UserTeamBetController],
  providers: [UserTeamBetService],
  exports: [TypeOrmModule, UserTeamBetService],
})
export class UserTeamBetModule {}
