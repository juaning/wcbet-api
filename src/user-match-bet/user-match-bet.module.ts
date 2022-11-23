import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMatchBet } from 'src/model/userMatchBet.entity';
import { UserMatchBetController } from './user-match-bet.controller';
import { UserMatchBetService } from './user-match-bet.service';
import { ApiWc2022Module } from '../api-wc2022/api-wc2022.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserMatchBet]),
    HttpModule,
    ApiWc2022Module,
  ],
  controllers: [UserMatchBetController],
  providers: [UserMatchBetService],
  exports: [TypeOrmModule, UserMatchBetService],
})
export class UserMatchBetModule {}
