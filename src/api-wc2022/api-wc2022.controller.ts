import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiWc2022Service } from './api-wc2022.service';
import {
  IMatchDefinition,
  IStandingDefinition,
  ITeamDefinition,
} from './api-wc2022.interface';
import { HttpServiceInterceptor } from './api-wc2022-interceptor.service';

@UseInterceptors(HttpServiceInterceptor)
@Controller('api-wc2022')
export class ApiWc2022Controller {
  constructor(private readonly apiWC2022Service: ApiWc2022Service) {}

  @Get()
  public getAllTeams(): Observable<Array<ITeamDefinition>> {
    return this.apiWC2022Service.getAllTeams();
  }

  /**
   * Match related endpoints
   */

  @Get('/matches')
  public getAllMatches(): Observable<Array<IMatchDefinition>> {
    return this.apiWC2022Service.getAllMatches();
  }

  @Get('/matches/:day')
  public getMatchesByDay(
    @Param('day', ParseIntPipe) day: number,
  ): Observable<Array<IMatchDefinition>> {
    return this.apiWC2022Service.getMatchesByMatchDay(day);
  }

  @Get('/match/:id')
  public getMatchById(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<IMatchDefinition> {
    return this.apiWC2022Service.getMatchById(id);
  }

  /**
   * Standings related endpoints
   */

  @Get('/standings')
  public getAllStandings(): Observable<Array<IStandingDefinition>> {
    return this.apiWC2022Service.getAllStandings();
  }

  @Get('/standings/:group')
  public getStandingsByGroup(
    @Param('group') group: string,
  ): Observable<IStandingDefinition> {
    // Group letter should be capital
    return this.apiWC2022Service.getStandingsByGroup(group.toLocaleUpperCase());
  }
}
