import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiWc2022Service } from './api-wc2022.service';
import { ITeamDefinition } from './api-wc2022.interface';
import { HttpServiceInterceptor } from './api-wc2022-interceptor.service';

@UseInterceptors(HttpServiceInterceptor)
@Controller('api-wc2022')
export class ApiWc2022Controller {
  constructor(private readonly apiWC2022Service: ApiWc2022Service) {}

  @Get()
  public getAllTeams(): Observable<Array<ITeamDefinition> | string> {
    return this.apiWC2022Service.getAllTeams();
  }
}
