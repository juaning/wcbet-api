import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { DateTime } from 'luxon';
import { UserTeamBet } from 'src/model/userTeamBet.entity';
import { User } from 'src/user.decorator';
import { CreateUserTeamBetDTO, UserTeamBetDTO } from './user-team-bet.dto';
import {
  canBetChamNGroups,
  TeamBetTypeEnum,
  wcStartDateTime,
} from '../config/common';

@Injectable()
export class UserTeamBetService {
  private readonly wcStartDeadline = [
    TeamBetTypeEnum.CHAMPION,
    TeamBetTypeEnum.GROUP_WINNER,
    TeamBetTypeEnum.GROUP_SECOND,
  ];

  constructor(
    @InjectRepository(UserTeamBet)
    private readonly repo: Repository<UserTeamBet>,
  ) {}

  public async getTeamBetsByUser(user: User): Promise<UserTeamBetDTO[]> {
    return await (
      await this.repo.find({ where: { createdBy: user.id } })
    ).map((bet: UserTeamBet) => UserTeamBetDTO.fromEntity(bet));
  }

  public async getTeamBetById(id: string, user: User): Promise<UserTeamBetDTO> {
    const bet = await this.repo.findOneBy({ id: id, createdBy: user.id });
    return UserTeamBetDTO.fromEntity(bet);
  }

  public async getTeamBetsByGroupId(
    groupId: string,
    user: User,
  ): Promise<Array<UserTeamBetDTO>> {
    return await (
      await this.repo.findBy({ createdBy: user.id, groupId: groupId })
    ).map((bet: UserTeamBet) => UserTeamBetDTO.fromEntity(bet));
  }

  public async getTeamBetByMatchId(
    matchId: string,
    user: User,
  ): Promise<UserTeamBetDTO> {
    const bet = await this.repo.findOneBy({
      createdBy: user.id,
      matchId: matchId,
    });
    return UserTeamBetDTO.fromEntity(bet);
  }

  public async getTeamBetByInstanceAndUser(
    instance: number,
    user: User,
  ): Promise<UserTeamBetDTO[]> {
    return await (
      await this.repo.findBy({
        createdBy: user.id,
        instance: instance,
      })
    ).map((bet: UserTeamBet) => UserTeamBetDTO.fromEntity(bet));
  }

  public async create(
    dto: CreateUserTeamBetDTO,
    user: User,
  ): Promise<UserTeamBetDTO> {
    if (this.wcStartDeadline.includes(dto.instance) && canBetChamNGroups()) {
      // Check if date started
      throw new BadRequestException(
        'No se puede apostar una vez empezado el mundial',
      );
    } else {
      // Check match start date
    }
    return this.repo
      .save(dto.toEntity(user))
      .then((bet: UserTeamBet) => UserTeamBetDTO.fromEntity(bet));
  }

  public async update(dto: UserTeamBetDTO, user: User): Promise<UpdateResult> {
    if (this.wcStartDeadline.includes(dto.instance) && canBetChamNGroups()) {
      throw new BadRequestException(
        'No se puede apostar una vez empezado el mundial',
      );
    } else {
      // Check match start date
    }
    return this.repo.update(
      { createdBy: user.id, id: dto.id },
      dto.toEntity(user),
    );
  }
}
