import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';
import {
  IMatchDefinition,
  IStandingDefinition,
  ITeamDefinition,
} from './api-wc2022.interface';
import { ApiStatusResponseEnum } from './common';
import { ttl1min, ttl5min, ttl24h } from '../config/common';

@Injectable()
export class ApiWc2022Service {
  constructor(
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  public async getAllTeams(): Promise<Array<ITeamDefinition>> {
    // Check if we've got it stored
    const cachedData = await this.cacheService.get<Array<ITeamDefinition>>(
      'teams',
    );
    if (cachedData) {
      console.info('All teams from cache');
      return cachedData;
    }

    // if not, we request and store in cache
    const { data } = await this.httpService.axiosRef.get('/team');
    if (data.status === ApiStatusResponseEnum.Success) {
      await this.cacheService.set('teams', data.data, ttl24h);
      console.info('All teams from 3rd party');
      return data.data;
    } else {
      throw new Error(data.message);
    }
  }

  public async getAllMatches(): Promise<Array<IMatchDefinition>> {
    const cachedData = await this.cacheService.get<Array<IMatchDefinition>>(
      'allMatches',
    );
    if (cachedData) {
      console.info('All matches from cache');
      return cachedData;
    }

    const { data } = await this.httpService.axiosRef.get('/match');
    if (data.status === ApiStatusResponseEnum.Success) {
      await this.cacheService.set('allMatches', data.data, ttl1min);
      console.info('All matches from 3rd party');
      return data.data;
    } else {
      throw new Error(data.message);
    }
  }

  public async getMatchesByMatchDay(
    day: number,
  ): Promise<Array<IMatchDefinition>> {
    const cachedData = await this.cacheService.get<Array<IMatchDefinition>>(
      `matchday-${day}`,
    );
    if (cachedData) {
      console.log(`All matches for match day ${day} from cache`);
      return cachedData;
    }

    const { data } = await this.httpService.axiosRef.get(`/bymatch/${day}`);
    if (data.status === ApiStatusResponseEnum.Success) {
      await this.cacheService.set(`matchday-${day}`, data.data, ttl5min);
      console.log(`All matches for match day ${day} from 3rd party`);
      return data.data;
    } else {
      throw new Error(data.message);
    }
  }

  public async getMatchById(id: number): Promise<IMatchDefinition> {
    const cachedData = await this.cacheService.get<IMatchDefinition>(
      `match:${id}`,
    );
    if (cachedData) {
      console.log(`Match data from cache`);
      return cachedData;
    }

    const { data } = await this.httpService.axiosRef.get(`/match/${id}`);
    if (data.status === ApiStatusResponseEnum.Success && data.data.length > 0) {
      await this.cacheService.set(`match:${id}`, data.data[0], ttl1min);
      console.log(`Match data from 3rd party`);
      return data.data[0];
    } else {
      throw new Error(data.message);
    }
  }

  public async getAllStandings(): Promise<Array<IStandingDefinition>> {
    const cachedData = await this.cacheService.get<Array<IStandingDefinition>>(
      'allStandings',
    );
    if (cachedData) {
      console.log('All standings from cache');
      return cachedData;
    }

    const { data } = await this.httpService.axiosRef.get('/standings');
    if (data.status === ApiStatusResponseEnum.Success) {
      await this.cacheService.set('allStandings', data.data, ttl5min);
      console.log('All standings from 3rd party');
      return data.data;
    } else {
      throw new Error(data.message);
    }
  }

  public async getStandingsByGroup(
    group: string,
  ): Promise<IStandingDefinition> {
    const cachedData = await this.cacheService.get<IStandingDefinition>(
      `groupStandings:${group}`,
    );
    if (cachedData) {
      console.log(`Group ${group} standings from cache`);
      return cachedData;
    }

    const { data } = await this.httpService.axiosRef.get(`/standings/${group}`);
    if (data.status === ApiStatusResponseEnum.Success && data.data.length > 0) {
      await this.cacheService.set(
        `groupStandings:${group}`,
        data.data[0],
        ttl5min,
      );
      console.log(`Group ${group} standings from 3rd party`);
      return data.data[0];
    } else {
      throw new Error(data.message);
    }
  }
}
