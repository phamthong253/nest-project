import { PermissionService } from '../../services/permission/permission.service';
import { ControllerPrefix } from '../../shared/controller-prefix.enum';
import { AppPermission } from '../../shared/permissions.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Required } from '@decorators/required-permission.decorator';
import { Route } from '@decorators/route.decorator';
import { Get } from '@nestjs/common';

@ApiBearerAuth()
@Route(ControllerPrefix.PERMISSIONS)
export class PermissionController {
  constructor(private readonly _permissionService: PermissionService) {}

  @Get()
  @Required(AppPermission.PERMISSION_READ)
  findAll(): Promise<string[]> {
    return this._permissionService.findAll();
  }
}
