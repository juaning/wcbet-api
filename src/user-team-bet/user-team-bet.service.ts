import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { DateTime } from 'luxon';
import { UserTeamBet } from 'src/model/userTeamBet.entity';
import { User } from 'src/user.decorator';
import { CreateUserTeamBetDTO, UserTeamBetDTO } from './user-team-bet.dto';
import {
  canBetChamNGroups,
  TeamBetTypeEnum,
  transformDateTimeToLocal,
} from '../config/common';
import { IMatchDefinition } from '../api-wc2022/api-wc2022.interface';
import { ApiWc2022Service } from '../api-wc2022/api-wc2022.service';

@Injectable()
export class UserTeamBetService {
  @Inject(ApiWc2022Service)
  private readonly apiWC2022Service: ApiWc2022Service;

  private readonly wcStartDeadline = [
    TeamBetTypeEnum.CHAMPION,
    TeamBetTypeEnum.GROUP_WINNER,
    TeamBetTypeEnum.GROUP_SECOND,
  ];

  constructor(
    @InjectRepository(UserTeamBet)
    private readonly repo: Repository<UserTeamBet>,
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

  public async getTeamBetsByUser(user: User): Promise<UserTeamBetDTO[]> {
    return await (
      await this.repo.find({ where: { createdBy: user.id } })
    ).map((bet: UserTeamBet) => UserTeamBetDTO.fromEntity(bet));
  }

  public async getTeamBetsByUserId(userId: string): Promise<UserTeamBetDTO[]> {
    return await (
      await this.repo.find({ where: { createdBy: userId } })
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
    if (!bet) {
      throw new NotFoundException('No existe la apuesta.');
    }
    return UserTeamBetDTO.fromEntity(bet);
  }

  public async getTeamBetByMatchIdUserId(
    matchId: string,
    userId: string,
  ): Promise<UserTeamBetDTO> {
    const bet = await this.repo.findOneBy({
      createdBy: userId,
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

  public async getTeamBetByInstanceAndUserId(
    intance: number,
    userId: string,
  ): Promise<UserTeamBetDTO[]> {
    return await (
      await this.repo.findBy({ createdBy: userId, instance: intance })
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
      if (dto.matchId) {
        const hasStarted = await this.hasGameStarted(dto.matchId);

        if (hasStarted) {
          throw new BadRequestException(
            'No se puede apostar una vez empezado el partido.',
          );
        }
      }
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
      if (dto.matchId) {
        const hasStarted = await this.hasGameStarted(dto.matchId);

        if (hasStarted) {
          throw new BadRequestException(
            'No se puede apostar una vez empezado el partido.',
          );
        }
      }
    }
    return this.repo.update(
      { createdBy: user.id, id: dto.id },
      dto.toEntity(user),
    );
  }
}
