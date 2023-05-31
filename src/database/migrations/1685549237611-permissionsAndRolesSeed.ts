/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrationInterface, QueryRunner } from 'typeorm';
import { permissionsSeed } from '../seeds/permission.seed';
import { Permission } from '../models/permission.entity';
import { rolesSeed } from '../seeds/role.seed';
import { Role } from '../models/role.entity';

export class PermissionsAndRolesSeed1685549237611 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    const [userRole, adminRole] = rolesSeed;
    const permissions = (await queryRunner.manager.getRepository(Permission).save(permissionsSeed)) as Permission[];

    const userPermissions = [];
    const adminPermissions = [];

    for (const permission of permissions) {
      if (permission.name.includes('commission')) {
        userPermissions.push(permission);
        continue;
      }

      adminPermissions.push(permission);
    }

    (userRole as Record<string, any>)['permissions'] = userPermissions;
    (adminRole as Record<string, any>)['permissions'] = adminPermissions;

    await queryRunner.manager.getRepository(Role).save([userRole, adminRole]);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async down(queryRunner: QueryRunner): Promise<void> {}
}
