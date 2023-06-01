import { CommissionTypeService } from '../../services/commission-type/commission-type.service';
import { ControllerPrefix } from '../../shared/controller-prefix.enum';
import { CommissionType } from '@models/comissionType.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Route } from '@decorators/route.decorator';
import { Get } from '@nestjs/common';

@ApiBearerAuth()
@Route(ControllerPrefix.COMMISSION_TYPE)
export class CommissionTypeController {
  constructor(private readonly _commissionTypeService: CommissionTypeService) {}

  @Get()
  getAll(): Promise<CommissionType[]> {
    return this._commissionTypeService.findAll();
  }
}
