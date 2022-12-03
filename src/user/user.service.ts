import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManagementClient, User as User0 } from 'auth0';
import { Cache } from 'cache-manager';
import { DateTime } from 'luxon';
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
  ttl5min,
  lastMatchDateTimePerGroup,
  transformDateTimeToLocal,
  MatchTypeEnum,
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
    @Inject(CACHE_MANAGER) private readonly cacheService: Cache,
  ) {}

  private calculateMatchesPoints(
    bets: Array<UserMatchBetDTO>,
    matches: Array<IMatchDefinition>,
    knockoutBets: Array<UserTeamBetDTO>,
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
          newPts += points[match.type].winOrDraw;
        }
        // Calculate result points
        const resultMatches =
          match.away_score === bet.awayScore &&
          match.home_score === bet.homeScore;
        if (resultMatches) {
          newPts += points[match.type].result;
        }

        // Calculate stage points
        if (match.type !== MatchTypeEnum.GROUP) {
          const knockoutBet = knockoutBets.find(
            (kbet) => kbet.matchId === match.id,
          );
          if (knockoutBet) {
            console.log('There is a knockout bet');
            const goalDiff = match.away_score - match.home_score;
            const awayAdvances =
              goalDiff > 0 && match.away_team_id === knockoutBet.teamId;
            const homeAdvances =
              goalDiff < 0 && match.home_team_id === knockoutBet.teamId;
            if (awayAdvances || homeAdvances) {
              console.log('Advances matches bet');
              newPts += points[match.type].advances;
            }
          }
        }
        return newPts;
      }
      return pts;
    }, 0);
  }

  private async calculateGroupPoints(userId: string): Promise<number> {
    const now = DateTime.now().toLocal();
    const groups = await this.apiWC2022Service.getAllStandings();
    const groupWinners =
      await this.userTeamBetService.getTeamBetByInstanceAndUserId(
        TeamBetTypeEnum.GROUP_WINNER,
        userId,
      );
    const groupSeconds =
      await this.userTeamBetService.getTeamBetByInstanceAndUserId(
        TeamBetTypeEnum.GROUP_SECOND,
        userId,
      );
    return groups.reduce((accPts, group) => {
      let newPts = accPts;
      // check if final match of group is done
      const groupEndDate = transformDateTimeToLocal(
        lastMatchDateTimePerGroup[group.group],
      );
      if (now >= groupEndDate) {
        const sortedTeams = group.teams.sort((a, b) => {
          const ptsDiff = Number(b.pts) - Number(a.pts);
          if (ptsDiff === 0) {
            const goalDiff = Number(b.gd) - Number(a.gd);
            if (goalDiff === 0) {
              return Number(b.gf) - Number(a.gf);
            }
            return goalDiff;
          }
          return ptsDiff;
        });
        const betWinner = groupWinners.find(
          (winner) => winner.teamId === sortedTeams[0].team_id,
        );
        const betSecond = groupSeconds.find(
          (second) => second.teamId === sortedTeams[1].team_id,
        );
        const betWinnerInSecond = groupSeconds.find(
          (second) => second.teamId === sortedTeams[0].team_id,
        );
        const betSecondInFirst = groupWinners.find(
          (winner) => winner.teamId === sortedTeams[1].team_id,
        );
        if (betWinner) {
          newPts += points[MatchTypeEnum.GROUP].advances;
          console.log(
            `Group ${group.group} winner points: ${
              points[MatchTypeEnum.GROUP].advances
            }`,
          );
          if (betSecond) {
            newPts += points[MatchTypeEnum.GROUP].advances;
            console.log(
              `Group ${group.group} second points: ${
                points[MatchTypeEnum.GROUP].advances
              }`,
            );
          }
        }
        if (betWinnerInSecond) {
          newPts += points[MatchTypeEnum.GROUP].advancesAsSecond;
          console.log(
            `Group ${group.group} winner as second points: ${
              points[MatchTypeEnum.GROUP].advancesAsSecond
            }`,
          );
        }
        if (betSecondInFirst) {
          newPts += points[MatchTypeEnum.GROUP].advancesAsSecond;
          console.log(
            `Group ${group.group} second as winner points: ${
              points[MatchTypeEnum.GROUP].advancesAsSecond
            }`,
          );
        }
      }
      return newPts;
    }, 0);
    return Promise.resolve(0);
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
    // Check if we've got data cached
    const cachedData = await this.cacheService.get('allUsers');
    if (cachedData) {
      console.info('Got all users from cache.');
      return cachedData;
    }
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
          if (user.app_metadata?.disabled) return;
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

          // Fetch team bets for user
          const knockoutBets =
            await this.userTeamBetService.getTeamBetsByUserId(user.user_id);

          // Calculate matches points
          const matchesPts = this.calculateMatchesPoints(
            bets,
            matches,
            knockoutBets,
          );

          // Calculate group points
          const groupsPts = await this.calculateGroupPoints(user.user_id);

          // Calculate champion points

          return {
            pts: matchesPts + groupsPts,
            name: user.nickname || user.email,
            paid: user.app_metadata?.paid || false,
            groups: user.app_metadata?.groups || [],
            championFlag,
          };
        }),
      );
      const filteredUsers = usersWithMatchBets.filter(
        (user) => user !== undefined,
      );
      const sortedUsers = filteredUsers.sort((a, b) => b.pts - a.pts);
      await this.cacheService.set('allUsers', sortedUsers, ttl5min);
      console.info('Got all users from API.');
      return sortedUsers;
    } catch (err) {
      console.error(err);
    }
  }
}
