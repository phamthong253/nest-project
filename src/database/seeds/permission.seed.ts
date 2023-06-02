import { Permission } from '@models/permission.entity';

export const permissionsSeed: Omit<Permission, 'id'>[] = [
  // Commission
  { name: 'commission.read', description: 'Allows user to access commissions information' },
  { name: 'commission.modify', description: 'Allows user to modify (create/update) commissions resource' },
  { name: 'commission.delete', description: 'Allows user to remove commissions resource' },

  // Commission Type
  { name: 'commission-type.read', description: 'Allows user to access commissions type information' },
  { name: 'commission-type.modify', description: 'Allows user to modify (create/update) commissions type resource' },
  { name: 'commission-type.delete', description: 'Allows user to remove commissions type resource' },

  // User
  { name: 'user.read', description: 'Allows user to access user information' },
  { name: 'user.modify', description: 'Allows user to modify (create/update) user resource' },
  { name: 'user.delete', description: 'Allows user to remove user resource' },

  // Role
  { name: 'role.read', description: 'Allows user to access role information' },
  { name: 'role.modify', description: 'Allows user to modify (create/update) role resource' },
  { name: 'role.delete', description: 'Allows user to remove role resource' },

  // Permission
  { name: 'permission.read', description: 'Allows user to access permission information' },
];
