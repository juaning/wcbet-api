import { Test, TestingModule } from '@nestjs/testing';
import { UserMatchBetController } from './user-match-bet.controller';

describe('UserMatchBetController', () => {
  let controller: UserMatchBetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMatchBetController],
    }).compile();

    controller = module.get<UserMatchBetController>(UserMatchBetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
