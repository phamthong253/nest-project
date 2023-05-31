import { Body, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateComissionDto } from '../../dtos/createCommission.dto';
import { UpdateComissionDto } from '../../dtos/updateComission.dto';
import { CommissionService } from '../../services/commission/commission.service';
import { ControllerPrefix } from '../../shared/controller-prefix.enum';
import { Commission } from '@models/commission.entity';
import { Route } from '@decorators/route.decorator';

@Route(ControllerPrefix.COMMISSION)
export class CommissionController {
  constructor(private readonly _commissionService: CommissionService) {}

  @Get()
  getAll(): Promise<Commission[]> {
    return this._commissionService.findAll();
  }

  @Post()
  create(@Body() createCommissionDto: CreateComissionDto): Promise<Commission> {
    return this._commissionService.create(createCommissionDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommissionDto: UpdateComissionDto): Promise<Commission> {
    return this._commissionService.update(id, updateCommissionDto);
  }
}
