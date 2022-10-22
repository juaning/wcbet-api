import { Module } from '@nestjs/common';
import { UserMatchBetController } from './user-match-bet.controller';
import { UserMatchBetService } from './user-match-bet.service';

@Module({
  controllers: [UserMatchBetController],
  providers: [UserMatchBetService]
})
export class UserMatchBetModule {}
