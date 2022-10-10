import { Test, TestingModule } from '@nestjs/testing';
import { ApiWc2022Service } from './api-wc2022.service';

describe('ApiWc2022Service', () => {
  let service: ApiWc2022Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiWc2022Service],
    }).compile();

    service = module.get<ApiWc2022Service>(ApiWc2022Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
