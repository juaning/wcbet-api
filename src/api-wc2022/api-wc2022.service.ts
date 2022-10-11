import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map, Observable, ObservableInput } from 'rxjs';
import {
  IAllTeamsResponse,
  IMatchDefinition,
  IMatchesResponse,
  IStandingDefinition,
  IStandingsResponse,
  ITeamDefinition,
} from './api-wc2022.interface';
import { ApiStatusResponseEnum } from './common';

@Injectable()
export class ApiWc2022Service {
  constructor(private httpService: HttpService) {}

  private throwException(err): ObservableInput<any> {
    throw new HttpException(err.response?.data, err.response?.status);
  }

  public getAllTeams(): Observable<Array<ITeamDefinition>> {
    return this.httpService.get('/team').pipe(
      map((resp): IAllTeamsResponse => resp.data),
      map((data: IAllTeamsResponse): Array<ITeamDefinition> => {
        if (data.status === ApiStatusResponseEnum.Success) return data.data;
        throw new Error(data.message);
      }),
      catchError(this.throwException),
    );
  }

  public getAllMatches(): Observable<Array<IMatchDefinition>> {
    return this.httpService.get('/match').pipe(
      map((resp): IMatchesResponse => resp.data),
      map((data: IMatchesResponse): Array<IMatchDefinition> => {
        if (data.status === ApiStatusResponseEnum.Success) return data.data;
        throw new Error(data.message);
      }),
      catchError(this.throwException),
    );
  }

  public getMatchesByMatchDay(
    day: number,
  ): Observable<Array<IMatchDefinition>> {
    return this.httpService.get(`/bymatch/${day}`).pipe(
      map((resp): IMatchesResponse => resp.data),
      map((data: IMatchesResponse): Array<IMatchDefinition> => {
        if (data.status === ApiStatusResponseEnum.Success) return data.data;
        throw new Error(data.message);
      }),
      catchError(this.throwException),
    );
  }

  public getMatchById(id: number): Observable<IMatchDefinition> {
    return this.httpService.get(`/match/${id}`).pipe(
      map((resp): IMatchesResponse => resp.data),
      map((data: IMatchesResponse): IMatchDefinition => {
        if (
          data.status === ApiStatusResponseEnum.Success &&
          data.data.length > 0
        )
          return data.data[0];
        throw new Error(data.message);
      }),
      catchError(this.throwException),
    );
  }

  public getAllStandings(): Observable<Array<IStandingDefinition>> {
    return this.httpService.get('/standings').pipe(
      map((resp): IStandingsResponse => resp.data),
      map((data: IStandingsResponse): Array<IStandingDefinition> => {
        if (data.status === ApiStatusResponseEnum.Success) return data.data;
        throw new Error(data.message);
      }),
      catchError(this.throwException),
    );
  }

  public getStandingsByGroup(group: string): Observable<IStandingDefinition> {
    return this.httpService.get(`/standings/${group}`).pipe(
      map((resp): IStandingsResponse => resp.data),
      map((data: IStandingsResponse): IStandingDefinition => {
        if (
          data.status === ApiStatusResponseEnum.Success &&
          data.data.length > 0
        )
          return data.data[0];
        throw new Error(data.message);
      }),
      catchError(this.throwException),
    );
  }
}
