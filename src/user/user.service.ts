import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManagementClient, User as User0 } from 'auth0';
import { User } from 'src/model/user.entity';
import { UserDTO } from './user.dto';
import * as dotenv from 'dotenv';
import { ApiWc2022Service } from '../api-wc2022/api-wc2022.service';
import { UserMatchBetService } from '../user-match-bet/user-match-bet.service';
import {
  fifaFlag,
  MatchTimeElapsedEnum,
  points,
  TeamBetTypeEnum,
} from '../config/common';
import { UserMatchBetDTO } from '../user-match-bet/user-match-bet.dto';
import { IMatchDefinition } from '../api-wc2022/api-wc2022.interface';
import { UserTeamBetService } from '../user-team-bet/user-team-bet.service';
import { UserTeamBetDTO } from '../user-team-bet/user-team-bet.dto';

dotenv.config();

@Injectable()
export class UserService {
  @Inject(ApiWc2022Service)
  private readonly apiWC2022Service: ApiWc2022Service;
  @Inject(UserMatchBetService)
  private readonly userMatchBetService: UserMatchBetService;
  @Inject(UserTeamBetService)
  private readonly userTeamBetService: UserTeamBetService;

  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  private calculateMatchesPoints(
    bets: Array<UserMatchBetDTO>,
    matches: Array<IMatchDefinition>,
  ): number {
    return bets.reduce<number>((pts, bet) => {
      const match = matches.find(
        (item: IMatchDefinition): boolean => item.id === bet.matchId,
      );

      if (
        match &&
        (match.time_elapsed === MatchTimeElapsedEnum.FINISHED ||
          match.finished === 'TRUE')
      ) {
        let newPts = pts;
        // Calculate who won
        const awayWon =
          match.away_score > match.home_score && bet.awayScore > bet.homeScore;
        const homeWon =
          match.away_score < match.home_score && bet.awayScore < bet.homeScore;
        const draw =
          match.away_score === match.home_score &&
          bet.awayScore === bet.homeScore;
        if (awayWon || homeWon || draw) {
          newPts += points[match.type].groupWinOrDraw;
        }
        // Calculate result points
        const resultMatches =
          match.away_score === bet.awayScore &&
          match.home_score === bet.homeScore;
        if (resultMatches) {
          newPts += points[match.type].groupResult;
        }
        return newPts;
      }
      return pts;
    }, 0);
  }

  public async getAll(): Promise<UserDTO[]> {
    return await this.repo
      .find()
      .then((users) => users.map((user) => UserDTO.fromEntity(user)));
  }

  public async create(dto: UserDTO, userId: string): Promise<UserDTO> {
    return this.repo
      .save(dto.toEntity(userId))
      .then((e) => UserDTO.fromEntity(e));
  }

  public async getAllUsers(): Promise<any> {
    const authZero = new ManagementClient({
      domain: process.env.AUTH0_DOMAIN_M2M,
      clientId: process.env.AUTH0_CLIENTID_M2M,
      clientSecret: process.env.AUTH0_CLIENTSECRET_M2M,
      scope: 'read:users update:users',
    });
    try {
      const teams = await this.apiWC2022Service.getAllTeams();
      const users: Array<User0> = await authZero.getUsers();
      const usersWithMatchBets = await Promise.all(
        users.map(async (user) => {
          let championFlag = fifaFlag;
          // Fetch champion bet
          const championBet: UserTeamBetDTO[] =
            await this.userTeamBetService.getTeamBetByInstanceAndUserId(
              TeamBetTypeEnum.CHAMPION,
              user.user_id,
            );
          if (championBet.length > 0) {
            const championTeam = teams.find(
              (team) => team.id === championBet[0].teamId,
            );
            championFlag = championTeam.flag;
          }
          // Fetch match bets for user
          const bets = await this.userMatchBetService.getMatchBetByUserId(
            user.user_id,
          );

          // Fetch matches for bets
          const matches = await this.apiWC2022Service.getAllMatches();

          // Calculate matches points
          const matchesPts = this.calculateMatchesPoints(bets, matches);

          // Calculate stage points

          // Calculate champion points

          return {
            pts: matchesPts,
            name: user.nickname || user.email,
            paid: user.app_metadata?.paid || false,
            groups: user.app_metadata.groups || [],
            championFlag,
          };
        }),
      );
      return usersWithMatchBets.sort((a, b) => b.pts - a.pts);
    } catch (err) {
      console.error(err);
    }
  }
}
