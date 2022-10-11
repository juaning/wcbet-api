import { ApiStatusResponseEnum } from './common';

export interface ITeamDefinition {
  _id: string;
  name_en: string;
  name_fa: string;
  flag: string;
  fifa_code: string;
  iso2: string;
  groups: string;
  id: string;
}

export interface IAllTeamsResponse {
  status: `${ApiStatusResponseEnum}`; // ApiStatusResponseEnum.Success | ApiStatusResponseEnum.Error
  message?: string;
  data?: Array<ITeamDefinition>;
}

export interface IMatchDefinition {
  _id: string;
  away_score: number;
  away_scorers: Array<string>;
  away_team_id: string;
  finished: string;
  group: string;
  home_score: number;
  home_scorers: Array<string>;
  home_team_id: string;
  id: number;
  local_date: string;
  matchday: number;
  persian_date: string;
  stadium_id: string;
  time_elapsed: string;
  type: string; // We might be able to change this to ENUM
  home_team_fa: string;
  away_team_fa: string;
  home_team_en: string;
  away_team_en: string;
  home_flag: string;
  away_flag: string;
}
export interface IAllMatchesResponse {
  status: `${ApiStatusResponseEnum}`; // ApiStatusResponseEnum.Success | ApiStatusResponseEnum.Error
  message?: string;
  data?: Array<IMatchDefinition>;
}
