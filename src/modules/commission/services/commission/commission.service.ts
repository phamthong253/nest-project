import { DeepPartial, FindOptionsSelect, FindOptionsWhere, IsNull, Repository } from 'typeorm';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CommissionTypeService } from '../commission-type/commission-type.service';
import { CreateCommissionDto } from '../../dtos/create-commission.dto';
import { UpdateCommissionDto } from '../../dtos/update-commission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectHelper } from '@helpers/object.helper';
import { Commission } from 'src/database/models/commission.entity';
import { PermissionService } from 'src/modules/security/services/permission/permission.service';
import { AppPermission } from 'src/modules/security/shared/permissions.enum';

@Injectable()
export class CommissionService {
  constructor(
    @InjectRepository(Commission)
    private readonly _commissionRepo: Repository<Commission>,
    private readonly _commissionTypeService: CommissionTypeService,
    private readonly _permissionService: PermissionService,
  ) {}

  async findAll(select?: FindOptionsSelect<Commission>, params?: Record<string, any>): Promise<Commission[]> {
    const requiredPermissions = [AppPermission.COMMISSION_READ, AppPermission.COMMISSION_DELETE, AppPermission.COMMISSION_MODIFY];
    let _select: FindOptionsSelect<Commission> = {
      id: true,
      name: true,
      createTime: true,
      imageSrc: true,
      price: true,
      createdBy: { id: true },
      updatedBy: { id: true },
      ownedBy: { id: true },
    };

    if (select) {
      _select = { ..._select, ...select };
    }

    if (params && params.userId) {
      const { user, userId } = params;

      if (user.userId !== userId) {
        const userPermissions = await this._permissionService.findByUserId(user.userId);

        if (!requiredPermissions.every((permission) => userPermissions.includes(permission))) {
          throw new ForbiddenException('Insufficient Privileges.');
        }
      }

      return this._commissionRepo.find({
        select: _select,
        relations: { type: true, createdBy: true, updatedBy: true, ownedBy: true },
        where: { createdBy: { id: userId }, deleteTime: IsNull() },
      });
    }

    return await this._commissionRepo.find({
      select: _select,
      relations: { type: true },
      where: { deleteTime: IsNull() },
    });
  }

  async create(createCommissionDto: CreateCommissionDto, userId: string): Promise<Commission> {
    if (!this._commissionTypeService.checkId(createCommissionDto.typeId)) {
      throw new BadRequestException('Commission type is deleted or does not exist');
    }

    const { name, imageSrc, price, typeId, toUserId } = createCommissionDto;
    const modifyUser = { id: userId };

    return await this._commissionRepo.save(
      this._commissionRepo.create({
        name,
        imageSrc,
        price,
        type: { id: typeId },
        createdBy: modifyUser,
        updatedBy: modifyUser,
        ownedBy: { id: toUserId },
      }),
    );
  }

  async update(id: string, updateCommissionDto: UpdateCommissionDto, userId: string): Promise<Commission> {
    if (!(await this._existId(id))) {
      throw new BadRequestException('Commission is deleted or does not exist');
    }

    const { typeId, ...otherProps } = ObjectHelper.filterEmptyProps(UpdateCommissionDto, updateCommissionDto);
    const commissionParams: DeepPartial<Commission> = { id, ...otherProps, updateTime: Date.now(), updatedBy: { id: userId } };

    if (typeId && (await this._commissionTypeService.checkId(typeId))) {
      commissionParams.type = { id: typeId };
    }

    return this._commissionRepo.save(this._commissionRepo.create(commissionParams));
  }

  async delete(id: string, userId: string): Promise<Partial<Commission>> {
    if (!(await this._existId(id))) {
      throw new BadRequestException('Commission is deleted or does not exist');
    }

    const modifyUser = { id: userId };
    const now = Date.now();

    return await this._commissionRepo.save({ id, deleteTime: now, updateTime: now, deletedBy: modifyUser, updatedBy: modifyUser });
  }

  private _existId(id: string): Promise<boolean> {
    try {
      return this._commissionRepo.exist({ where: { id, deleteTime: IsNull() } });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
