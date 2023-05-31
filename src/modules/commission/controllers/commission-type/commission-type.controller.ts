import { CommissionTypeService } from '../../services/commission-type/commission-type.service';
import { CommissionType } from 'src/database/models/ComissionType.entity';
import { ControllerPrefix } from '../../shared/controller-prefix.enum';
import { Route } from 'src/shared/decorators/route.decorator';
import { Get } from '@nestjs/common';

@Route(ControllerPrefix.COMMISSION_TYPE)
export class CommissionTypeController {
  constructor(private readonly _commissionTypeService: CommissionTypeService) {}

  @Get()
  getAll(): Promise<CommissionType[]> {
    return this._commissionTypeService.findAll();
  }
}
