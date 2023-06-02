import { InjectRepository } from '@nestjs/typeorm';
import { EncryptService } from 'src/modules/security/services/encrypt/encrypt.service';
import { UpdateUserDto } from '../../dtos/updateUset.dto';
import { CreateUserDto } from '../../dtos/createUser.dto';
import { ObjectHelper } from '@helpers/object.helper';
import { RoleService } from 'src/modules/security/services/role/role.service';
import { DefaultRole } from 'src/modules/security/shared/default-role.enum';
import { BadRequestException, Injectable } from '@nestjs/common';
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
    return await this._userRepo.find({ select: { username: true, email: true, roles: true, id: true } });
  }

  async findBy(props: Partial<User>, omitPassword = false): Promise<User | null> {
    try {
      return await this._userRepo.findOne({
        relations: { roles: true },
        select: { username: true, email: true, roles: true, id: true, password: !omitPassword },
        where: props,
      });
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this._userRepo.create(createUserDto);
    const userRole = await this._roleService.findBy({ name: DefaultRole.USER });

    user.password = await this._encryptService.hash(user.password);

    if (userRole) {
      user.roles = [userRole];
    } else {
      throw new Error('the default User role is missing!');
    }

    return await this._userRepo.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Partial<User>> {
    return this._userRepo.save({ id, ...ObjectHelper.filterEmptyProps(UpdateUserDto, updateUserDto) });
  }
}
