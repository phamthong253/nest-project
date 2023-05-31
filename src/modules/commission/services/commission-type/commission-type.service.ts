import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommissionType } from 'src/database/models/ComissionType.entity';
import { Repository } from 'typeorm';
import { CreateCommissionTypeDto } from '../../dtos/CreateCommissionType.dto';

@Injectable()
export class CommissionTypeService {
  constructor(
    @InjectRepository(CommissionType)
    private readonly _commissionTypeRepo: Repository<CommissionType>,
  ) {}

  findAll(): Promise<CommissionType[]> {
    return this._commissionTypeRepo.find();
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
  create(createCommissionTypeDto: CreateCommissionTypeDto): Promise<CommissionType> {
    const type = this._commissionTypeRepo.create(createCommissionTypeDto);

    return this._commissionTypeRepo.save(type);
  }
}
