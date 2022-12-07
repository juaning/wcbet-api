import { Test, TestingModule } from '@nestjs/testing';
import { ApiWc2022Service } from './api-wc2022.service';

class ApiServiceMock {
  getAllTeams() {
    return [];
  }

  getAllMatches() {
    return [];
  }

  getMatchesByMatchDay(_day) {
    return [];
  }

  getMatchById(_id) {
    return {};
  }

  getAllStandings() {
    return [];
  }

  getStandingsByGroup(group) {
    return {};
  }
}

describe('ApiWc2022Service', () => {
  let service: ApiWc2022Service;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: ApiWc2022Service,
      useClass: ApiServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiWc2022Service, ApiServiceProvider],
    }).compile();

    service = module.get<ApiWc2022Service>(ApiWc2022Service);
  });

  describe('Teams', () => {
    it('should call getAllTeams', async () => {
      const allTeamsSpy = jest.spyOn(service, 'getAllTeams');
      service.getAllTeams();
      expect(allTeamsSpy).toHaveBeenCalled();
    });
  });

  describe('Matches', () => {
    it('should call getAllMatches', () => {
      const allMatchesSpy = jest.spyOn(service, 'getAllMatches');
      service.getAllMatches();
      expect(allMatchesSpy).toHaveBeenCalled();
    });

    it('should call getMatchesByMatchDay with Day = 1', () => {
      const getMatchesBetByMatchDaySpy = jest.spyOn(
        service,
        'getMatchesByMatchDay',
      );
      service.getMatchesByMatchDay(1);
      expect(getMatchesBetByMatchDaySpy).toHaveBeenCalled();
      expect(getMatchesBetByMatchDaySpy).toHaveBeenCalledWith(1);
    });

    it('should call getMatchById with ID = 1', () => {
      const getMatchByIdSpy = jest.spyOn(service, 'getMatchById');
      service.getMatchById(1);
      expect(getMatchByIdSpy).toHaveBeenCalled();
      expect(getMatchByIdSpy).toHaveBeenCalledWith(1);
    });
  });

  describe('Standings', () => {
    it('should call getAllStandings', () => {
      const getAllStandingsSpy = jest.spyOn(service, 'getAllStandings');
      service.getAllStandings();
      expect(getAllStandingsSpy).toHaveBeenCalled();
    });

    it('should call getStandingByGroup with Group = "A"', () => {
      const getStandingByGroupSpy = jest.spyOn(service, 'getStandingsByGroup');
      service.getStandingsByGroup('A');
      expect(getStandingByGroupSpy).toHaveBeenCalled();
      expect(getStandingByGroupSpy).toHaveBeenCalledWith('A');
    });
  });
});
