import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMatchBet } from 'src/model/userMatchBet.entity';
import { User } from 'src/model/user.entity';
import { UserMatchBetDTO } from './user-match-bet.dto';

@Injectable()
export class UserMatchBetService {
  constructor(
    @InjectRepository(UserMatchBet)
    private readonly repo: Repository<UserMatchBet>,
  ) {}

  public async getAll(): Promise<UserMatchBetDTO[]> {
    return await this.repo
      .find()
      .then((bets) => bets.map((bet) => UserMatchBetDTO.fromEntity(bet)));
  }

  public async create(
    dto: UserMatchBetDTO,
    user: User,
  ): Promise<UserMatchBetDTO> {
    return this.repo
      .save(dto.toEntity(user))
      .then((bet) => UserMatchBetDTO.fromEntity(bet));
  }
}
