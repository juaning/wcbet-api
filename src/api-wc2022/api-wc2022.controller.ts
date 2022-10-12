import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
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
@ApiTags('api-wc2022')
export class ApiWc2022Controller {
  constructor(private readonly apiWC2022Service: ApiWc2022Service) {}

  @Get()
  @ApiOkResponse({
    description: 'Teams retrieved successfully.',
    type: ITeamDefinition,
    isArray: true,
  })
  public getAllTeams(): Observable<Array<ITeamDefinition>> {
    return this.apiWC2022Service.getAllTeams();
  }

  /**
   * Match related endpoints
   */

  @Get('/matches')
  @ApiOkResponse({
    description: 'All matches retrieve successfully.',
    type: IMatchDefinition,
    isArray: true,
  })
  public getAllMatches(): Observable<Array<IMatchDefinition>> {
    return this.apiWC2022Service.getAllMatches();
  }

  @Get('/matches/:day')
  @ApiOkResponse({
    description: 'All matches by day match retrieve successfully.',
    type: IMatchDefinition,
    isArray: true,
  })
  public getMatchesByDay(
    @Param('day', ParseIntPipe) day: number,
  ): Observable<Array<IMatchDefinition>> {
    return this.apiWC2022Service.getMatchesByMatchDay(day);
  }

  @Get('/match/:id')
  @ApiOkResponse({
    description: 'Match retrieve successfully.',
    type: IMatchDefinition,
  })
  public getMatchById(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<IMatchDefinition> {
    return this.apiWC2022Service.getMatchById(id);
  }

  /**
   * Standings related endpoints
   */

  @Get('/standings')
  @ApiOkResponse({
    description: 'All standings retrieve successfully.',
    type: IStandingDefinition,
    isArray: true,
  })
  public getAllStandings(): Observable<Array<IStandingDefinition>> {
    return this.apiWC2022Service.getAllStandings();
  }

  @Get('/standings/:group')
  @ApiOkResponse({
    description: 'Group standings retrieve successfully.',
    type: IStandingDefinition,
  })
  public getStandingsByGroup(
    @Param('group') group: string,
  ): Observable<IStandingDefinition> {
    // Group letter should be capital
    return this.apiWC2022Service.getStandingsByGroup(group.toLocaleUpperCase());
  }
}
