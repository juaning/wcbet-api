import { Test, TestingModule } from '@nestjs/testing';
import { UserTeamBetController } from './user-team-bet.controller';

describe('UserTeamBetController', () => {
  let controller: UserTeamBetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTeamBetController],
    }).compile();

    controller = module.get<UserTeamBetController>(UserTeamBetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
