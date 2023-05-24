import { CommissionTypeService } from '../commission-type/commission-type.service';
import { CreateComissionDto } from '../../dtos/CreateCommission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Commission } from 'src/database/models/Commission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommissionService {
  constructor(
    @InjectRepository(Commission)
    private readonly commissionRepo: Repository<Commission>,
    private readonly commissionTypeService: CommissionTypeService,
  ) {}

  findAll(): Promise<Commission[]> {
    return this.commissionRepo.find({
      relations: { type: true },
    });
  }

  async create(createCommissionDto: CreateComissionDto) {
    const type = await this.commissionTypeService.findById(
      createCommissionDto.typeId,
    );

    if (!type) {
      throw new Error();
    }

    const { name, imageSrc, price } = createCommissionDto;
    const createdTime = Date.now();
    const commissionParams = { name, imageSrc, price, createdTime, type };
    const commission = this.commissionRepo.create(commissionParams);

    return this.commissionRepo.save(commission);
  }
}
