import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateComissionDto } from '../../dtos/createCommission.dto';
import { UpdateComissionDto } from '../../dtos/updateComission.dto';
import { CommissionService } from '../../services/commission/commission.service';
import { ControllerPrefix } from '../../shared/controller-prefix.enum';
import { AppPermission } from 'src/modules/security/shared/permissions.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Commission } from '@models/commission.entity';
import { Route } from '@decorators/route.decorator';
import { Required } from '@decorators/required-permission.decorator';

@ApiBearerAuth()
@Route(ControllerPrefix.COMMISSION)
export class CommissionController {
  constructor(private readonly _commissionService: CommissionService) {}

  @Get()
  @Required(AppPermission.COMMISSION_READ)
  getAll(): Promise<Commission[]> {
    return this._commissionService.findAll();
  }

  @Post()
  @Required(AppPermission.COMMISSION_MODIFY)
  create(@Body() createCommissionDto: CreateComissionDto): Promise<Commission> {
    return this._commissionService.create(createCommissionDto);
  }

  @Patch(':id')
  @Required(AppPermission.COMMISSION_MODIFY)
  update(@Param('id') id: string, @Body() updateCommissionDto: UpdateComissionDto): Promise<Commission> {
    return this._commissionService.update(id, updateCommissionDto);
  }

  @Delete(':id')
  @Required(AppPermission.COMMISSION_DELETE)
  delete(@Param('id') id: string): Promise<Partial<Commission>> {
    return this._commissionService.delete(id);
  }
}
