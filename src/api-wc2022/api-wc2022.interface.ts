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
