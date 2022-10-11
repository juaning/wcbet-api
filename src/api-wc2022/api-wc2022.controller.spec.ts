import { Test, TestingModule } from '@nestjs/testing';
import { ApiWc2022Controller } from './api-wc2022.controller';

describe('ApiWc2022Controller', () => {
  let controller: ApiWc2022Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiWc2022Controller],
    }).compile();

    controller = module.get<ApiWc2022Controller>(ApiWc2022Controller);
  });
});
