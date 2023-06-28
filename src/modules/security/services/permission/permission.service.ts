import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AppPermission } from '../../shared/permissions.enum';
import { Permission } from '@models/permission.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@models/user.entity';

@Injectable()
export class PermissionService {
  constructor(@InjectRepository(Permission) private readonly _permissionRepo: Repository<Permission>, private readonly _dataSource: DataSource) {}

  async findAll(full?: boolean): Promise<string[] | Permission[]> {
    const permissions = await this._permissionRepo.find();

    if (full) {
      return permissions;
    }

    const permissionNameList = [];

    for (const { name } of permissions) {
      permissionNameList.push(name);
    }

    return permissionNameList;
  }

  async findByUserId(id: string): Promise<string[]> {
    try {
      const permissionNameList: string[] = [];
      const permissionNames = await this._dataSource
        .getRepository(User)
        .createQueryBuilder('user')
        .select('permission.name', 'permissionName') // Select the permission name
        .distinctOn(['permission.name'])
        .innerJoin('user.roles', 'role') // Join the Role entity
        .innerJoin('role.permissions', 'permission') // Join the Permission entity
        .where('user.id = :id AND role.enabled = true', { id })
        .getRawMany<{ permissionName: AppPermission }>();

      for (const { permissionName } of permissionNames) {
        permissionNameList.push(permissionName);
      }

      return permissionNameList;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
