import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreateComissionDto } from '../../dtos/CreateCommission.dto';
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
    try {
      return this.commissionService.create(createCommissionDto);
    } catch (err) {
      throw new HttpException('Invalid Commission Type', HttpStatus.BAD_REQUEST, { cause: err });
    }
  }
}
