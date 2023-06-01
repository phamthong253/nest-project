import { InjectRepository } from '@nestjs/typeorm';
import { EncryptService } from 'src/modules/security/services/encrypt/encrypt.service';
import { UpdateUserDto } from '../../dtos/updateUset.dto';
import { CreateUserDto } from '../../dtos/createUser.dto';
import { RoleService } from 'src/modules/security/services/role/role.service';
import { DefaultRole } from 'src/modules/security/shared/default-role.enum';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '@models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepo: Repository<User>,
    private readonly _roleService: RoleService,
    private readonly _encryptService: EncryptService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this._userRepo.find({
      relations: { roles: true },
      select: { username: true, email: true, roles: true },
    });
  }

  async findById(id: string, omitPassword = false): Promise<User | Omit<User, 'password'> | null> {
    try {
      let user: User | Omit<User, 'password'> | null = await this._userRepo.findOneBy({ id, roles: true });

      if (omitPassword && user) {
        const { password, ...others } = user as User;

        user = others;
      }

      return user;
    } catch (err) {
      throw new Error('Invalid User Id');
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this._userRepo.create(createUserDto);
    const userRole = await this._roleService.findRoleByName(DefaultRole.USER);

    user.password = await this._encryptService.generateHash(user.password);

    if (userRole) {
      user.roles = [userRole];
    } else {
      throw new Error('the default User role is missing!');
    }

    return await this._userRepo.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Partial<User>> {
    const filteredDto = Object.keys(updateUserDto).reduce((acc, key) => {
      const val = (updateUserDto as Record<string, any>)[key];
      const isArray = typeof val === 'object' && 'length' in val;
      const isNotNull = val !== undefined;

      if (isNotNull || (isArray && val.length)) {
        (acc as Record<string, any>)[key] = val;
      }

      return acc;
    }, new UpdateUserDto());

    return this._userRepo.save({ id, ...filteredDto });
  }
}
