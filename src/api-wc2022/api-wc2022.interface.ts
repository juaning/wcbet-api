import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiStatusResponseEnum } from './common';

export class ITeamDefinition {
  @ApiProperty({ type: String })
  _id: string;
  @ApiProperty({ type: String })
  name_en: string;
  @ApiProperty({ type: String })
  name_fa: string;
  @ApiProperty({ type: String })
  flag: string;
  @ApiProperty({ type: String })
  fifa_code: string;
  @ApiProperty({ type: String })
  iso2: string;
  @ApiProperty({ type: String })
  groups: string;
  @ApiProperty({ type: String })
  id: string;
}

export class IMatchDefinition {
  @ApiProperty({ type: String })
  _id: string;
  @ApiProperty({ type: String })
  away_score: number;
  @ApiProperty({ type: Array<string> })
  away_scorers: Array<string>;
  @ApiProperty({ type: String })
  away_team_id: string;
  @ApiProperty({ type: String })
  finished: string;
  @ApiProperty({ type: String })
  group: string;
  @ApiProperty({ type: Number })
  home_score: number;
  @ApiProperty({ type: Array<string> })
  home_scorers: Array<string>;
  @ApiProperty({ type: String })
  home_team_id: string;
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  local_date: string;
  @ApiProperty({ type: Number })
  matchday: number;
  @ApiProperty({ type: String })
  persian_date: string;
  @ApiProperty({ type: String })
  stadium_id: string;
  @ApiProperty({ type: String })
  time_elapsed: string;
  @ApiProperty({ type: String })
  type: string; // We might be able to change this to ENUM
  @ApiProperty({ type: String })
  home_team_fa: string;
  @ApiProperty({ type: String })
  away_team_fa: string;
  @ApiProperty({ type: String })
  home_team_en: string;
  @ApiProperty({ type: String })
  away_team_en: string;
  @ApiProperty({ type: String })
  home_flag: string;
  @ApiProperty({ type: String })
  away_flag: string;
}

export class IStandingTeamDefinition {
  @ApiProperty({ type: String })
  team_id: string;
  @ApiProperty({ type: String })
  mp: string;
  @ApiProperty({ type: String })
  w: string;
  @ApiProperty({ type: String })
  l: string;
  @ApiProperty({ type: String })
  pts: string;
  @ApiProperty({ type: String })
  gf: string;
  @ApiProperty({ type: String })
  ga: string;
  @ApiProperty({ type: String })
  gd: string;
  @ApiProperty({ type: String })
  name_fa: string;
  @ApiProperty({ type: String })
  name_en: string;
  @ApiProperty({ type: String })
  flag: string;
}

export class IStandingDefinition {
  @ApiProperty({ type: String })
  group: string;
  @ApiProperty({ type: Array<IStandingTeamDefinition> })
  teams: Array<IStandingTeamDefinition>;
}

export class IAllTeamsResponse {
  @ApiProperty({ type: ApiStatusResponseEnum })
  status: `${ApiStatusResponseEnum}`; // ApiStatusResponseEnum.Success | ApiStatusResponseEnum.Error
  @ApiPropertyOptional({ type: String })
  message?: string;
  @ApiPropertyOptional({ type: Array<ITeamDefinition> })
  data?: Array<ITeamDefinition>;
}

export class IMatchesResponse {
  @ApiProperty({ type: ApiStatusResponseEnum })
  status: `${ApiStatusResponseEnum}`; // ApiStatusResponseEnum.Success | ApiStatusResponseEnum.Error
  @ApiPropertyOptional({ type: String })
  message?: string;
  @ApiPropertyOptional({ type: Array<IMatchDefinition> })
  data?: Array<IMatchDefinition>;
}

export class IStandingsResponse {
  @ApiProperty({ type: ApiStatusResponseEnum })
  status: `${ApiStatusResponseEnum}`; // ApiStatusResponseEnum.Success | ApiStatusResponseEnum.Error
  @ApiPropertyOptional({ type: String })
  message?: string;
  @ApiPropertyOptional({ type: Array<IStandingDefinition> })
  data?: Array<IStandingDefinition>;
}
