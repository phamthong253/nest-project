import { CommissionService } from '../../services/commission/commission.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Commission } from 'src/database/models/Commission.entity';
import { CreateComissionDto } from '../../dtos/CreateCommission.dto';

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
}
