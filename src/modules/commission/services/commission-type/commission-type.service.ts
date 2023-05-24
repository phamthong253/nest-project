import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommissionType } from 'src/database/models/ComissionType.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommissionTypeService {
  constructor(
    @InjectRepository(CommissionType)
    private readonly commissionTypeRepo: Repository<CommissionType>,
  ) {}

  findAll(): Promise<CommissionType[]> {
    return this.commissionTypeRepo.find();
  }

  findById(id: string) {
    return this.commissionTypeRepo.findOneBy({ id });
  }
}
