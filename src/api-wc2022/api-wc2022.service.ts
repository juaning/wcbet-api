import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import {
  IAllMatchesResponse,
  IAllTeamsResponse,
  IMatchDefinition,
  ITeamDefinition,
} from './api-wc2022.interface';
import { ApiStatusResponseEnum } from './common';

@Injectable()
export class ApiWc2022Service {
  constructor(private httpService: HttpService) {}

  public getAllTeams(): Observable<Array<ITeamDefinition>> {
    return this.httpService.get('/team').pipe(
      map((resp): IAllTeamsResponse => resp.data),
      map((resp: IAllTeamsResponse): Array<ITeamDefinition> => {
        if (resp.status === ApiStatusResponseEnum.Success) return resp.data;
        throw new Error(resp.message);
      }),
    );
  }

  public getAllMatches(): Observable<Array<IMatchDefinition>> {
    return this.httpService.get('/match').pipe(
      map((resp): IAllMatchesResponse => resp.data),
      map((resp: IAllMatchesResponse): Array<IMatchDefinition> => {
        if (resp.status === ApiStatusResponseEnum.Success) return resp.data;
        throw new Error(resp.message);
      }),
    );
  }
}
