import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../../dtos/createUser.dto';
import { RoleService } from 'src/modules/security/services/role/role.service';
import { DefaultRole } from 'src/modules/security/shared/default-role.enum';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '@models/user.entity';
import { EncryptService } from 'src/modules/security/services/encrypt/encrypt.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepo: Repository<User>,
    private readonly _roleService: RoleService,
    private readonly _encryptService: EncryptService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this._userRepo.find();
  }

  async create(createUserDto: CreateUserDto) {
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
}
