import { Test, TestingModule } from '@nestjs/testing';
import { UserTeamBetService } from './user-team-bet.service';

describe('UserTeamBetService', () => {
  let service: UserTeamBetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTeamBetService],
    }).compile();

    service = module.get<UserTeamBetService>(UserTeamBetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
