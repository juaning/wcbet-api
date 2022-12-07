import { HttpModule } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MatchTypeEnum } from '../config/common';
import { ApiWc2022Controller } from './api-wc2022.controller';
import {
  IMatchDefinition,
  IStandingDefinition,
  ITeamDefinition,
} from './api-wc2022.interface';
import { ApiWc2022Service } from './api-wc2022.service';

describe('ApiWc2022Controller', () => {
  let controller: ApiWc2022Controller;
  let service: ApiWc2022Service;
  let matches: IMatchDefinition[];
  let matchesByDay: {
    [key: number]: IMatchDefinition[];
  } = undefined;
  let standings: IStandingDefinition[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [ApiWc2022Controller],
      providers: [ApiWc2022Service, { provide: CACHE_MANAGER, useValue: {} }],
    }).compile();

    service = module.get<ApiWc2022Service>(ApiWc2022Service);
    controller = module.get<ApiWc2022Controller>(ApiWc2022Controller);

    matches = [
      {
        _id: '629c9c8a5749c4077500ead4',
        away_score: 2,
        away_scorers: ['Cody Gakpo,Davy Klaassen\n'],
        away_team_id: '4',
        finished: 'TRUE',
        group: 'A',
        home_score: 0,
        home_scorers: ['null'],
        home_team_id: '3',
        id: '1',
        local_date: '11/21/2022 19:00',
        matchday: '2',
        persian_date: '1400-08-30 19:30',
        stadium_id: '1',
        time_elapsed: 'finished',
        type: MatchTypeEnum.GROUP,
        home_team_fa: 'سنگال',
        away_team_fa: 'هلند',
        home_team_en: 'Senegal',
        away_team_en: 'Netherlands',
        home_flag:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Flag_of_Senegal.svg/125px-Flag_of_Senegal.svg.png',
        away_flag:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/125px-Flag_of_the_Netherlands.svg.png',
      },
    ];

    matchesByDay = {
      0: matches,
    };

    standings = [
      {
        _id: '629c9c7c5749c4077500eaca',
        group: 'A',
        teams: [
          {
            team_id: '1',
            mp: '3',
            w: '0',
            l: '3',
            pts: '0',
            gf: '1',
            ga: '7',
            gd: '-6',
            d: '0',
            name_fa: 'قطر',
            name_en: 'Qatar',
            flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Qatar.svg/125px-Flag_of_Qatar.svg.png',
          },
          {
            team_id: '2',
            mp: '3',
            w: '1',
            l: '1',
            pts: '4',
            gf: '4',
            ga: '3',
            gd: '1',
            d: '1',
            name_fa: 'اکوادور',
            name_en: 'Ecuador',
            flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Flag_of_Ecuador.svg/125px-Flag_of_Ecuador.svg.png',
          },
          {
            team_id: '3',
            mp: '3',
            w: '2',
            l: '1',
            pts: '6',
            gf: '5',
            ga: '4',
            gd: '1',
            d: '0',
            name_fa: 'سنگال',
            name_en: 'Senegal',
            flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Flag_of_Senegal.svg/125px-Flag_of_Senegal.svg.png',
          },
          {
            team_id: '4',
            mp: '3',
            w: '2',
            l: '0',
            pts: '7',
            gf: '5',
            ga: '1',
            gd: '4',
            d: '1',
            name_fa: 'هلند',
            name_en: 'Netherlands',
            flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/125px-Flag_of_the_Netherlands.svg.png',
          },
        ],
      },
    ];
  });

  describe('Get all teams', () => {
    it('should return a list of teams', async () => {
      const result: ITeamDefinition[] = [
        {
          _id: '629c9c6b5749c4077500eaa8',
          name_en: 'Iran',
          name_fa: 'ایران',
          flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Iran.svg/125px-Flag_of_Iran.svg.png',
          fifa_code: 'IRN',
          iso2: 'IR',
          groups: 'B',
          id: '6',
        },
      ];
      jest
        .spyOn(service, 'getAllTeams')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.getAllTeams()).toBe(result);
    });
  });

  describe('Matches', () => {
    it('should return all matches', async () => {
      jest
        .spyOn(service, 'getAllMatches')
        .mockImplementation(() => Promise.resolve(matches));

      expect(await controller.getAllMatches()).toBe(matches);
    });

    it('should return all matches by day', async () => {
      jest
        .spyOn(service, 'getMatchesByMatchDay')
        .mockImplementation((day) => Promise.resolve(matchesByDay[day]));
      expect(await controller.getMatchesByDay(0)).toStrictEqual(matches);
      expect(service.getMatchesByMatchDay).toBeCalledWith(0);
    });

    it('should return match by id', async () => {
      jest
        .spyOn(service, 'getMatchById')
        .mockImplementation((id) => Promise.resolve(matches[id]));
      expect(await controller.getMatchById(0)).toStrictEqual(matches[0]);
      expect(service.getMatchById).toHaveBeenCalledWith(0);
    });
  });

  describe('Standings', () => {
    it('should return all standings', async () => {
      jest.spyOn(service, 'getAllStandings').mockResolvedValue(standings);
      expect(await controller.getAllStandings()).toBe(standings);
    });

    it('should return group standing', async () => {
      jest
        .spyOn(service, 'getStandingsByGroup')
        .mockResolvedValue(standings[0]);
      expect(await controller.getStandingsByGroup('a')).toBe(standings[0]);
      expect(service.getStandingsByGroup).toHaveBeenCalledWith('A');
    });
  });
});
