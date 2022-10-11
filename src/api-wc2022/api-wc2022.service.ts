import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable, tap } from 'rxjs';
import { IAllTeamsResponse, ITeamDefinition } from './api-wc2022.interface';
import { ApiStatusResponseEnum } from './common';

@Injectable()
export class ApiWc2022Service {
  constructor(private httpService: HttpService) {}

  public getAllTeams(): Observable<Array<ITeamDefinition> | string> {
    return this.httpService.get('/team').pipe(
      map((resp): IAllTeamsResponse => resp.data),
      map((resp: IAllTeamsResponse): Array<ITeamDefinition> | string => {
        if (resp.status === ApiStatusResponseEnum.Success) return resp.data;
        return resp.message;
      }),
    );
  }
}
