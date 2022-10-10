import { Controller, Get } from '@nestjs/common';
import { ApiWc2022Service } from './api-wc2022.service';
import { ITeamDefinition } from './api-wc2022.interface';

@Controller('api-wc2022')
export class ApiWc2022Controller {
  constructor(private readonly apiWC2022Service: ApiWc2022Service) {}

  @Get()
  public getAllTeams(): Array<ITeamDefinition> {
    return this.apiWC2022Service.getAllTeams();
  }
}
