import { PermissionController } from './controllers/permission/permission.controller';
import { PermissionService } from './services/permission/permission.service';
import { RoleController } from './controllers/role/role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './services/role/role.service';
import { Permission } from '@models/permission.entity';
import { Module } from '@nestjs/common';
import { Role } from '@models/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  controllers: [RoleController, PermissionController],
  providers: [PermissionService, RoleService],
})
export class SecurityModule {}
