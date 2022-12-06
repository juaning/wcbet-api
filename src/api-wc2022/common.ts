export enum ApiStatusResponseEnum {
  Success = 'success',
  Error = 'error',
}

export enum MatchDefinedEnum {
  REGULAR = 'regular',
  EXTRA_TIME = 'extra',
  PENALTIES = 'penalties',
}

export const resultsKnockout = {
  '52': {
    _id: '638923be0eab2168b945af35',
    away_score: 1,
    away_extra_time_score: 1,
    away_penalties_score: 1,
    away_scorers: ['I. Perišić,Penalties(1)'],
    away_team_id: '20',
    finished: 'TRUE',
    group: 'R16',
    home_score: 1,
    home_extra_time_score: 1,
    home_penalties_score: 3,
    home_scorers: ['Daizen Maeda,Penalties(3)'],
    home_team_id: '18',
    id: '52',
    matchDefined: MatchDefinedEnum.PENALTIES,
    local_date: '12/5/2022 18:00',
    matchday: '16',
    persian_date: '1400-09-14 18:30',
    stadium_id: '1',
    time_elapsed: 'finished',
    type: 'R16',
    home_team_fa: 'کرواسی',
    away_team_fa: 'ژاپن',
    home_team_en: 'Croatia',
    away_team_en: 'Japan',
    home_flag:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_Croatia.svg/125px-Flag_of_Croatia.svg.png',
    away_flag:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/125px-Flag_of_Japan.svg.png',
  },
};
