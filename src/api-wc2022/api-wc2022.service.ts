import { Injectable } from '@nestjs/common';
import { IAllTeamsResponse, ITeamDefinition } from './api-wc2022.interface';
import { ApiStatusResponseEnum } from './common';

const mockTeams = [
  {
    _id: '629c9c6b5749c4077500eaa8',
    name_en: 'Iran',
    name_fa: 'ایران',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg',
    fifa_code: 'IRN',
    iso2: 'IR',
    groups: 'B',
    id: '6',
  },
  {
    _id: '629c9c6b5749c4077500eaa9',
    name_en: 'England',
    name_fa: 'انگلستان',
    flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/125px-Flag_of_England.svg.png',
    fifa_code: 'ENG',
    iso2: 'ENG',
    groups: 'B',
    id: '5',
  },
];

@Injectable()
export class ApiWc2022Service {
  private teamsResponse: IAllTeamsResponse = {
    // Mocking data
    status: ApiStatusResponseEnum.Success,
    data: mockTeams,
  };

  public getAllTeams(): Array<ITeamDefinition> {
    return this.teamsResponse.data;
  }
}
