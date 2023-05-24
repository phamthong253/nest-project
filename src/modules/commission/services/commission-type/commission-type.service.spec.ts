import { Test, TestingModule } from '@nestjs/testing';
import { CommissionTypeService } from './commission-type.service';

describe('CommissionTypeService', () => {
  let service: CommissionTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommissionTypeService],
    }).compile();

    service = module.get<CommissionTypeService>(CommissionTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
