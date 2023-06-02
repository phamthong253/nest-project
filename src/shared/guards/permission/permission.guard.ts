import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PERMISSION_KEY } from '@decorators/required-permission.decorator';
import { AppPermission } from 'src/modules/security/shared/permissions.enum';
import { DataSource } from 'typeorm';
import { Reflector } from '@nestjs/core';
import { User } from '@models/user.entity';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly _dataSource: DataSource) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<AppPermission[]>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const perrmissionSet = new Set(requiredPermissions);
    const permissionNameList = [];
    const permissionNames = await this._dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .select('permission.name', 'permissionName') // Select the permission name
      .innerJoin('user.roles', 'role') // Join the Role entity
      .innerJoin('role.permissions', 'permission') // Join the Permission entity
      .where('user.id = :id', { id: user.userId })
      .getRawMany();

    for (const { permissionName } of permissionNames) {
      permissionNameList.push(permissionName);
    }

    return permissionNameList.some((permission) => perrmissionSet.has(permission));
  }
}
