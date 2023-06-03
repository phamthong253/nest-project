import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommissionTypeDto } from '../../dtos/create-commission-type.dto';
import { UpdateCommissionTypeDto } from '../../dtos/update-commission-type.dto';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommissionType } from '@models/commission-type.entity';

@Injectable()
export class CommissionTypeService {
  constructor(
    @InjectRepository(CommissionType)
    private readonly _commissionTypeRepo: Repository<CommissionType>,
  ) {}

  async findAll(): Promise<CommissionType[]> {
    return await this._commissionTypeRepo.find({
      select: { id: true, createTime: true, updateTime: true, name: true },
      where: { deleteTime: IsNull() },
    });
  }

  /**
   * Should only be used when a new type is needed.
   */
  async create(createCommissionTypeDto: CreateCommissionTypeDto): Promise<CommissionType> {
    const type = this._commissionTypeRepo.create(createCommissionTypeDto);

    return await this._commissionTypeRepo.save(type);
  }

  async update(id: string, updateCommissionTypeDto: UpdateCommissionTypeDto): Promise<Partial<CommissionType>> {
    if (!(await this._existId(id))) {
      throw new BadRequestException('Commission type is deleted or does not exist.');
    }

    return this._commissionTypeRepo.save({ id, ...updateCommissionTypeDto, updateTime: Date.now() });
  }

  async delete(id: string): Promise<Partial<CommissionType>> {
    if (!(await this._existId(id))) {
      throw new BadRequestException('Commission type is deleted or does not exist.');
    }

    const now = Date.now();

    return this._commissionTypeRepo.save({ id, deleteTime: now, updateTime: now });
  }

  checkId(id: string): Promise<boolean> {
    return this._existId(id);
  }

  private async _existId(id: string): Promise<boolean> {
    try {
      return await this._commissionTypeRepo.exist({ where: { id, deleteTime: IsNull() } });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
