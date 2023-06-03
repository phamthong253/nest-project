import { CommissionTypeService } from '../../services/commission-type/commission-type.service';
import { ControllerPrefix } from '../../shared/controller-prefix.enum';
import { CommissionType } from '@models/comission-type.entity';
import { AppPermission } from 'src/modules/security/shared/permissions.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Required } from '@decorators/required-permission.decorator';
import { Route } from '@decorators/route.decorator';
import { Body, Get, Post } from '@nestjs/common';
import { CreateCommissionTypeDto } from '../../dtos/create-commission-type.dto';

@ApiBearerAuth()
@Route(ControllerPrefix.COMMISSION_TYPE)
export class CommissionTypeController {
  constructor(private readonly _commissionTypeService: CommissionTypeService) {}

  @Get()
  @Required(AppPermission.COMMISSION_TYPE_READ)
  getAll(): Promise<CommissionType[]> {
    return this._commissionTypeService.findAll();
  }

  @Post()
  @Required(AppPermission.COMMISSION_TYPE_MODIFY)
  create(@Body() createCommissionTypeDto: CreateCommissionTypeDto): Promise<CommissionType> {
    return this._commissionTypeService.create(createCommissionTypeDto);
  }
}
