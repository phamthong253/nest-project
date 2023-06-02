import { BadRequestException, Injectable } from '@nestjs/common';
import { DeepPartial, FindOptionsSelect, IsNull, Repository } from 'typeorm';
import { CommissionTypeService } from '../commission-type/commission-type.service';
import { CreateComissionDto } from '../../dtos/createCommission.dto';
import { UpdateComissionDto } from '../../dtos/updateComission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectHelper } from '@helpers/object.helper';
import { Commission } from '@models/commission.entity';

@Injectable()
export class CommissionService {
  constructor(
    @InjectRepository(Commission)
    private readonly _commissionRepo: Repository<Commission>,
    private readonly _commissionTypeService: CommissionTypeService,
  ) {}

  async findAll(select?: FindOptionsSelect<Commission>): Promise<Commission[]> {
    let _select = { id: true, name: true, createTime: true, imageSrc: true, price: true };

    if (select) {
      _select = { ..._select, ...select };
    }

    return await this._commissionRepo.find({
      select: _select,
      relations: { type: true },
      where: { deleteTime: IsNull() },
    });
  }

  async create(createCommissionDto: CreateComissionDto): Promise<Commission> {
    if (!this._commissionTypeService.checkId(createCommissionDto.typeId)) {
      throw new BadRequestException('Commission type is deleted or does not exist');
    }

    const { name, imageSrc, price, typeId } = createCommissionDto;

    return await this._commissionRepo.save(
      this._commissionRepo.create({ name, imageSrc, price, type: { id: typeId } }),
    );
  }

  async update(id: string, updateCommissionDto: UpdateComissionDto): Promise<Commission> {
    if (!(await this._existId(id))) {
      throw new BadRequestException('Commission is deleted or does not exist');
    }

    const { typeId, ...otherProps } = ObjectHelper.filterEmptyProps(UpdateComissionDto, updateCommissionDto);
    const commissionParams: DeepPartial<Commission> = { id, ...otherProps, updateTime: Date.now() };

    if (typeId && (await this._commissionTypeService.checkId(typeId))) {
      commissionParams.type = { id: typeId };
    }

    return this._commissionRepo.save(this._commissionRepo.create(commissionParams));
  }

  async delete(id: string): Promise<Partial<Commission>> {
    if (!(await this._existId(id))) {
      throw new BadRequestException('Commission is deleted or does not exist');
    }

    const now = Date.now();

    return await this._commissionRepo.save({ id, deleteTime: now, updateTime: now });
  }

  private _existId(id: string): Promise<boolean> {
    try {
      return this._commissionRepo.exist({ where: { id, deleteTime: IsNull() } });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
