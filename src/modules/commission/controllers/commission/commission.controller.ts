import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateComissionDto } from '../../dtos/CreateCommission.dto';
import { UpdateComissionDto } from '../../dtos/UpdateComission.dto';
import { CommissionService } from '../../services/commission/commission.service';
import { Commission } from 'src/database/models/Commission.entity';

@Controller('commission')
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
