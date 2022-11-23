import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { DateTime } from 'luxon';
import { UserMatchBet } from 'src/model/userMatchBet.entity';
import { User } from 'src/user.decorator';
import { UserMatchBetDTO } from './user-match-bet.dto';
import { ApiWc2022Service } from '../api-wc2022/api-wc2022.service';
import { transformDateTimeToLocal } from '../config/common';
import { IMatchDefinition } from '../api-wc2022/api-wc2022.interface';

@Injectable()
export class UserMatchBetService {
  @Inject(ApiWc2022Service)
  private readonly apiWC2022Service: ApiWc2022Service;

  constructor(
    @InjectRepository(UserMatchBet)
    private readonly repo: Repository<UserMatchBet>,
  ) {}

  private async hasGameStarted(matchId: string): Promise<boolean> {
    const match: IMatchDefinition = await this.apiWC2022Service.getMatchById(
      Number(matchId),
    );

    // We should check with current time, as matches could be save
    // until the game has started
    const now = DateTime.now().toLocal();
    const matchDateTime = transformDateTimeToLocal(match.local_date);

    return now >= matchDateTime;
  }

  public async getAll(): Promise<UserMatchBetDTO[]> {
    return await this.repo
      .find()
      .then((bets) => bets.map((bet) => UserMatchBetDTO.fromEntity(bet)));
  }

  public async getMatchBetByUser(user: User): Promise<UserMatchBetDTO[]> {
    return await (
      await this.repo.find({ where: { createdBy: user.id } })
    ).map((bet) => UserMatchBetDTO.fromEntity(bet));
  }

  public async getMatchBetByUserId(id: string): Promise<UserMatchBetDTO[]> {
    return await (
      await this.repo.find({ where: { createdBy: id } })
    ).map((bet) => UserMatchBetDTO.fromEntity(bet));
  }

  public async create(
    dto: UserMatchBetDTO,
    user: User,
  ): Promise<UserMatchBetDTO> {
    const hasStarted = await this.hasGameStarted(dto.matchId);

    if (hasStarted) {
      throw new BadRequestException('Cannot bet on started game');
    }

    return this.repo
      .save(dto.toEntity(user))
      .then((bet) => UserMatchBetDTO.fromEntity(bet));
  }

  public async update(
    id: string,
    dto: UserMatchBetDTO,
    user: User,
  ): Promise<UpdateResult> {
    const hasStarted = await this.hasGameStarted(dto.matchId);

    if (hasStarted) {
      throw new BadRequestException('Cannot bet on started game');
    }

    return this.repo.update(
      { createdBy: user.id, matchId: id },
      dto.toEntity(user),
    );
  }
}
