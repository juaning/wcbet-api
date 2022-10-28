import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTeamBet } from 'src/model/userTeamBet.entity';
import { User } from 'src/user.decorator';
import { UserTeamBetDTO } from './user-team-bet.dto';

@Injectable()
export class UserTeamBetService {
  constructor(
    @InjectRepository(UserTeamBet)
    private readonly repo: Repository<UserTeamBet>,
  ) {}

  public async getTeamBetsByUser(user: User): Promise<UserTeamBetDTO[]> {
    return await (
      await this.repo.find({ where: { createdBy: user.id } })
    ).map((bet: UserTeamBet) => UserTeamBetDTO.fromEntity(bet));
  }

  public async create(
    dto: UserTeamBetDTO,
    user: User,
  ): Promise<UserTeamBetDTO> {
    return this.repo
      .save(dto.toEntity(user))
      .then((bet: UserTeamBet) => UserTeamBetDTO.fromEntity(bet));
  }
}
