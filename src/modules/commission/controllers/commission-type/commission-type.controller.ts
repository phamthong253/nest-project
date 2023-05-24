import { CommissionTypeService } from '../../services/commission-type/commission-type.service';
import { Controller, Get } from '@nestjs/common';

@Controller('commission-type')
export class CommissionTypeController {
  constructor(private readonly commissionTypeService: CommissionTypeService) {}

  @Get()
  getAll() {
    return this.commissionTypeService.findAll();
  }
}
