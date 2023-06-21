import { User } from '@models/user.entity';

export class UserDto {
  username: string;
  email: string;
  roles: string[];

  constructor(entity: Partial<User>) {
    this.username = entity.username ?? '';
    this.email = entity.email ?? '';
    this.roles = entity.roles?.map(({ id }) => id) ?? [];
  }
}
