import { PermissionService } from '../../services/permission/permission.service';
import { ControllerPrefix } from '../../shared/controller-prefix.enum';
import { UtilityRequest } from 'src/shared/utility.type';
import { AppPermission } from '../../shared/permissions.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Required } from '@decorators/required-permission.decorator';
import { Get, Req } from '@nestjs/common';
import { Route } from '@decorators/route.decorator';

@ApiBearerAuth()
@Route(ControllerPrefix.PERMISSIONS)
export class PermissionController {
  constructor(private readonly _permissionService: PermissionService) {}

  @Get()
  @Required(AppPermission.PERMISSION_READ)
  findAll(): Promise<string[]> {
    return this._permissionService.findAll();
  }
  @Get('current-user')
  getUserPermission(@Req() { user }: UtilityRequest): Promise<string[]> {
    return this._permissionService.findByUserId(user.userId);
  }
}
