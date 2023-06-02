import { AppPermission } from 'src/modules/security/shared/permissions.enum';
import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'roles';
export const Required = (...permissions: AppPermission[]) => SetMetadata(PERMISSION_KEY, permissions);
