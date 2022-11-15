import { Test, TestingModule } from '@nestjs/testing';
import { UserMatchBetService } from './user-match-bet.service';

describe('UserMatchBetService', () => {
  let service: UserMatchBetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMatchBetService],
    }).compile();

    service = module.get<UserMatchBetService>(UserMatchBetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
