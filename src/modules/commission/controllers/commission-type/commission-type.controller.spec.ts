import { Test, TestingModule } from '@nestjs/testing';
import { CommissionTypeController } from './commission-type.controller';

describe('CommissionTypeController', () => {
  let controller: CommissionTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommissionTypeController],
    }).compile();

    controller = module.get<CommissionTypeController>(CommissionTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
