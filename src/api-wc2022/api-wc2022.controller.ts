import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
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
  public getAllTeams(): Promise<Array<ITeamDefinition>> {
    try {
      return this.apiWC2022Service.getAllTeams();
    } catch (err) {
      return err;
    }
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
  public getAllMatches(): Promise<Array<IMatchDefinition>> {
    try {
      return this.apiWC2022Service.getAllMatches();
    } catch (err) {
      return err;
    }
  }

  @Get('/matches/:day')
  @ApiOkResponse({
    description: 'All matches by day match retrieve successfully.',
    type: IMatchDefinition,
    isArray: true,
  })
  public getMatchesByDay(
    @Param('day', ParseIntPipe) day: number,
  ): Promise<Array<IMatchDefinition>> {
    try {
      return this.apiWC2022Service.getMatchesByMatchDay(day);
    } catch (err) {
      return err;
    }
  }

  @Get('/match/:id')
  @ApiOkResponse({
    description: 'Match retrieve successfully.',
    type: IMatchDefinition,
  })
  public getMatchById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IMatchDefinition> {
    try {
      return this.apiWC2022Service.getMatchById(id);
    } catch (err) {
      return err;
    }
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
  public getAllStandings(): Promise<Array<IStandingDefinition>> {
    try {
      return this.apiWC2022Service.getAllStandings();
    } catch (err) {
      return err;
    }
  }

  @Get('/standings/:group')
  @ApiOkResponse({
    description: 'Group standings retrieve successfully.',
    type: IStandingDefinition,
  })
  public getStandingsByGroup(
    @Param('group') group: string,
  ): Promise<IStandingDefinition> {
    // Group letter should be capital
    try {
      return this.apiWC2022Service.getStandingsByGroup(
        group.toLocaleUpperCase(),
      );
    } catch (err) {
      return err;
    }
  }
}
