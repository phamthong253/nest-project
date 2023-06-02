import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptService } from 'src/modules/security/services/encrypt/encrypt.service';
import { UpdateUserDto } from '../../dtos/updateUset.dto';
import { CreateUserDto } from '../../dtos/createUser.dto';
import { ObjectHelper } from '@helpers/object.helper';
import { RoleService } from 'src/modules/security/services/role/role.service';
import { DefaultRole } from 'src/modules/security/shared/default-role.enum';
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
    const select = { username: true, email: true, roles: true, id: true, createTime: true, updateTime: true };

    return await this._userRepo.find({ select, where: { deleteTime: IsNull() } });
  }

  async findBy(where: Partial<User>, omitPassword = false): Promise<User | null> {
    const select = { username: true, email: true, roles: true, id: true, createTime: true, updateTime: true };

    try {
      return await this._userRepo.findOne({
        relations: { roles: true },
        select: { ...select, password: !omitPassword },
        where: { ...where, deleteTime: IsNull() },
      });
    } catch (err) {
      throw new InternalServerErrorException(err.err);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this._userRepo.create(createUserDto);
    const userRole = await this._roleService.findBy({ name: DefaultRole.USER });

    if (!userRole) {
      throw new InternalServerErrorException('The default User role is missing');
    }

    user.password = await this._encryptService.hash(user.password);
    user.roles = [userRole];

    return await this._userRepo.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Partial<User>> {
    if (!(await this._existId(id))) {
      throw new BadRequestException('User is deleted or does not exist.');
    }

    return await this._userRepo.save({
      id,
      ...ObjectHelper.filterEmptyProps(UpdateUserDto, updateUserDto),
      updateTime: Date.now(),
    });
  }

  async delete(id: string): Promise<Partial<User>> {
    if (!(await this._existId(id))) {
      throw new BadRequestException('User is deleted or does not exist.');
    }

    const now = Date.now();

    return await this._userRepo.save({ id, deleteTime: now, updateTime: now });
  }

  private _existId(id: string): Promise<boolean> {
    try {
      return this._userRepo.exist({ where: { id, deleteTime: IsNull() } });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
