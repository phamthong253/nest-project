import { Body, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { CreateCommissionDto } from '../../dtos/create-commission.dto';
import { UpdateCommissionDto } from '../../dtos/update-commission.dto';
import { CommissionService } from '../../services/commission/commission.service';
import { ControllerPrefix } from '../../shared/controller-prefix.enum';
import { UtilityRequest } from 'src/shared/utility.type';
import { AppPermission } from 'src/modules/security/shared/permissions.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Commission } from '@models/commission.entity';
import { Required } from '@decorators/required-permission.decorator';
import { Route } from '@decorators/route.decorator';

@ApiBearerAuth()
@Route(ControllerPrefix.COMMISSION)
export class CommissionController {
  constructor(private readonly _commissionService: CommissionService) {}

  @Get()
  @Required(AppPermission.COMMISSION_READ)
  getAll(): Promise<Commission[]> {
    return this._commissionService.findAll({ type: { id: true, name: true } });
  }

  @Post()
  @Required(AppPermission.COMMISSION_MODIFY)
  create(@Body() createCommissionDto: CreateCommissionDto, @Req() { user }: UtilityRequest): Promise<Commission> {
    return this._commissionService.create(createCommissionDto, user.userId);
  }

  @Patch(':id')
  @Required(AppPermission.COMMISSION_MODIFY)
  update(@Param('id') id: string, @Body() updateCommissionDto: UpdateCommissionDto, @Req() { user }: UtilityRequest): Promise<Commission> {
    return this._commissionService.update(id, updateCommissionDto, user.userId);
  }

  @Delete(':id')
  @Required(AppPermission.COMMISSION_DELETE)
  delete(@Param('id') id: string, @Req() { user }: UtilityRequest): Promise<Partial<Commission>> {
    return this._commissionService.delete(id, user.userId);
  }
}
