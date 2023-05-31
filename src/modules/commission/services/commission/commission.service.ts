import { DeepPartial, Repository } from 'typeorm';
import { CommissionTypeService } from '../commission-type/commission-type.service';
import { CreateComissionDto } from '../../dtos/createCommission.dto';
import { UpdateComissionDto } from '../../dtos/updateComission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Commission } from '@models/commission.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommissionService {
  constructor(
    @InjectRepository(Commission)
    private readonly _commissionRepo: Repository<Commission>,
    private readonly _commissionTypeService: CommissionTypeService,
  ) {}

  async findAll(): Promise<Commission[]> {
    return await this._commissionRepo.find({
      relations: { type: true },
    });
  }

  async findById(id: string): Promise<Commission | null> {
    try {
      return await this._commissionRepo.findOneBy({ id });
    } catch (err) {
      throw new Error('Invalid Commission Id');
    }
  }

  async create(createCommissionDto: CreateComissionDto): Promise<Commission> {
    const type = await this._commissionTypeService.findById(createCommissionDto.typeId);

    if (!type) {
      throw new Error('Invalid Commission Type');
    }

    const { name, imageSrc, price } = createCommissionDto;
    const createdTime = Date.now();
    const commissionParams = { name, imageSrc, price, createdTime, type };

    return this._commissionRepo.save(this._commissionRepo.create(commissionParams));
  }

  async update(id: string, updateCommissionDto: UpdateComissionDto): Promise<Commission> {
    const commission = await this.findById(id);

    if (!commission) {
      throw new Error('Invalid Commission Id');
    }

    const { typeId, ...otherProps } = Object.keys(updateCommissionDto).reduce(
      (acc, key) => (!!(updateCommissionDto as any)[key] ? { ...acc, [key]: (updateCommissionDto as any)[key] } : acc),
      {} as UpdateComissionDto,
    );

    const commissionParams: DeepPartial<Commission> = { ...commission, ...otherProps };

    if (typeId) {
      const type = await this._commissionTypeService.findById(typeId);

      if (!type) {
        throw new Error('Invalid Commission Type');
      }

      commissionParams.type = type;
    }

    return this._commissionRepo.save(this._commissionRepo.create(commissionParams));
  }
}
