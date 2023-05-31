import { CommissionTypeService } from '../../services/commission-type/commission-type.service';
import { CommissionType } from 'src/database/models/ComissionType.entity';
import { Controller, Get } from '@nestjs/common';

@Controller('commission-type')
export class CommissionTypeController {
  constructor(private readonly _commissionTypeService: CommissionTypeService) {}

  @Get()
  getAll(): Promise<CommissionType[]> {
    return this._commissionTypeService.findAll();
  }
}
