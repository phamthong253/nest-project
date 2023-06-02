import { PermissionService } from '../../services/permission/permission.service';
import { ControllerPrefix } from '../../shared/controller-prefix.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Permission } from '@models/permission.entity';
import { Route } from '@decorators/route.decorator';
import { Get } from '@nestjs/common';
import { Required } from '@decorators/required-permission.decorator';
import { AppPermission } from '../../shared/permissions.enum';

@ApiBearerAuth()
@Route(ControllerPrefix.PERMISSIONS)
export class PermissionController {
  constructor(private readonly _permisionService: PermissionService) {}

  @Get()
  @Required(AppPermission.PERMISSION_READ)
  findAll(): Promise<Permission[]> {
    return this._permisionService.findAll();
  }
}
