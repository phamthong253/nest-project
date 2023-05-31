import { CreateCommissionTypeDto } from '../../dtos/CreateCommissionType.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommissionType } from '@models/ComissionType.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class CommissionTypeService {
  constructor(
    @InjectRepository(CommissionType)
    private readonly _commissionTypeRepo: Repository<CommissionType>,
  ) {}

  async findAll(): Promise<CommissionType[]> {
    return await this._commissionTypeRepo.find();
  }

  async findById(id: string): Promise<CommissionType | null> {
    try {
      return await this._commissionTypeRepo.findOneBy({ id });
    } catch (err) {
      throw new Error('Invalid Commission Type Id');
    }
  }

  /**
   * Should only be used when a new type is needed.
   */
  async create(createCommissionTypeDto: CreateCommissionTypeDto): Promise<CommissionType> {
    const type = this._commissionTypeRepo.create(createCommissionTypeDto);

    return await this._commissionTypeRepo.save(type);
  }
}
