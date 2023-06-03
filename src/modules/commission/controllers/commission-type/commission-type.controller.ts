import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateCommissionTypeDto } from '../../dtos/create-commission-type.dto';
import { UpdateCommissionTypeDto } from '../../dtos/update-commission-type.dto';
import { CommissionTypeService } from '../../services/commission-type/commission-type.service';
import { ControllerPrefix } from '../../shared/controller-prefix.enum';
import { CommissionType } from '@models/commission-type.entity';
import { AppPermission } from 'src/modules/security/shared/permissions.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Required } from '@decorators/required-permission.decorator';
import { Route } from '@decorators/route.decorator';

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

  @Patch(':id')
  @Required(AppPermission.COMMISSION_TYPE_MODIFY)
  update(@Param('id') id: string, @Body() updateCommissionTypeDto: UpdateCommissionTypeDto): Promise<Partial<CommissionType>> {
    return this._commissionTypeService.update(id, updateCommissionTypeDto);
  }

  @Delete(':id')
  @Required(AppPermission.COMMISSION_TYPE_DELETE)
  delete(@Param('id') id: string): Promise<Partial<CommissionType>> {
    return this._commissionTypeService.delete(id);
  }
}
