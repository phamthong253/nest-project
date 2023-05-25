import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateComissionDto } from '../../dtos/CreateCommission.dto';
import { UpdateComissionDto } from '../../dtos/UpdateComission.dto';
import { CommissionService } from '../../services/commission/commission.service';
import { Commission } from 'src/database/models/Commission.entity';

@Controller('commission')
export class CommissionController {
  constructor(private readonly commissionService: CommissionService) {}

  @Get()
  getAll(): Promise<Commission[]> {
    return this.commissionService.findAll();
  }

  @Post()
  create(@Body() createCommissionDto: CreateComissionDto): Promise<Commission> {
    return this.commissionService.create(createCommissionDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommissionDto: UpdateComissionDto): Promise<Commission> {
    return this.commissionService.update(id, updateCommissionDto);
  }
}
