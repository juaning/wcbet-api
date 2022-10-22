import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMatchBet } from 'src/model/userMatchBet.entity';
import { UserMatchBetController } from './user-match-bet.controller';
import { UserMatchBetService } from './user-match-bet.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserMatchBet])],
  controllers: [UserMatchBetController],
  providers: [UserMatchBetService],
  exports: [TypeOrmModule],
})
export class UserMatchBetModule {}
