import { FindOptionsSelect, IsNull, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommissionTypeDto } from '../../dtos/create-commission-type.dto';
import { UpdateCommissionTypeDto } from '../../dtos/update-commission-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommissionType } from '@models/commission-type.entity';
import { User } from '@models/user.entity';

@Injectable()
export class CommissionTypeService {
  constructor(
    @InjectRepository(CommissionType)
    private readonly _commissionTypeRepo: Repository<CommissionType>,
  ) {}

  async findAll(): Promise<CommissionType[]> {
    const userOptions: FindOptionsSelect<User> = { id: true, username: true };

    return await this._commissionTypeRepo.find({
      select: { id: true, createTime: true, updateTime: true, name: true, updatedBy: userOptions, createdBy: userOptions },
      where: { deleteTime: IsNull() },
      relations: { updatedBy: true, createdBy: true },
    });
  }

  async create(createCommissionTypeDto: CreateCommissionTypeDto, userId: string): Promise<CommissionType> {
    const type = this._commissionTypeRepo.create(createCommissionTypeDto);
    const modifyUser = { id: userId };

    return await this._commissionTypeRepo.save({ ...type, updatedBy: modifyUser, createdBy: modifyUser });
  }

  async update(id: string, updateCommissionTypeDto: UpdateCommissionTypeDto, userId: string): Promise<Partial<CommissionType>> {
    if (!(await this._existId(id))) {
      throw new BadRequestException('Commission type is deleted or does not exist.');
    }

    return this._commissionTypeRepo.save({ id, ...updateCommissionTypeDto, updateTime: Date.now(), updatedBy: { id: userId } });
  }

  async delete(id: string, userId: string): Promise<Partial<CommissionType>> {
    if (!(await this._existId(id))) {
      throw new BadRequestException('Commission type is deleted or does not exist.');
    }

    const modifyUser = { id: userId };
    const now = Date.now();

    return this._commissionTypeRepo.save({ id, deleteTime: now, updateTime: now, updatedBy: modifyUser, deletedBy: modifyUser });
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
