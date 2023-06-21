import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { FindOptionsSelect, FindOptionsWhere, IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptService } from 'src/modules/security/services/encrypt/encrypt.service';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { CreateUserDto } from '../../dtos/create-user.dto';
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

  /**
   * Get all users.
   * @param select The specified selected fields, default for all fields is `true`.
   * @returns All users from the database with the specified fields if there are any.
   */
  async findAll(select?: FindOptionsSelect<User>): Promise<User[]> {
    let _select = { username: true, email: true, id: true, createTime: true, updateTime: true };

    if (select) {
      _select = { ..._select, ...select };
    }

    return await this._userRepo.find({ select: _select, relations: { roles: true }, where: { deleteTime: IsNull() } });
  }

  /**
   * Finds the user given the condition and select.
   * @param where The condition to match the user.
   * @param select The specified selected fields, default for all fields is `true`.
   * @returns The matching user or `null` if there is not matching user.
   */
  async findBy(where: FindOptionsWhere<User>, select?: FindOptionsSelect<User>): Promise<User | null> {
    let _select = { username: true, email: true, id: true, createTime: true, updateTime: true };

    if (select) {
      _select = { ..._select, ...select };
    }

    try {
      return await this._userRepo.findOne({
        relations: {
          roles: typeof select?.roles === 'boolean' ? select.roles : typeof select?.roles?.permissions ? { permissions: true } : undefined,
        },
        select: _select,
        where: { ...where, deleteTime: IsNull() },
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  /**
   * Creates new user.
   * @param createUserDto a Data Transfer Object used to create new user.
   * @returns a newly created user.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this._userRepo.create(createUserDto);
    const userRole = await this._roleService.findOneBy({ name: DefaultRole.USER });

    if (!userRole) {
      throw new InternalServerErrorException('The default User role is missing');
    }

    user.password = await this._encryptService.hash(user.password);
    user.roles = [userRole];

    return await this._userRepo.save(user);
  }

  /**
   * Updates the existing user.
   * @param id The user's id to be updated
   * @param updateUserDto  Data Transfer Object used to update existing user information.
   * @returns The updated user.
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<Partial<User>> {
    if (!(await this.exist({ id }))) {
      throw new BadRequestException('User is deleted or does not exist.');
    }

    return await this._userRepo.save({
      id,
      ...ObjectHelper.filterEmptyProps(UpdateUserDto, updateUserDto),
      updateTime: Date.now(),
    });
  }

  /**
   * Deletes existing user.
   * @param id The user's id to be deleted.
   * @returns The deleted user.
   */
  async delete(id: string): Promise<Partial<User>> {
    if (!(await this.exist({ id }))) {
      throw new BadRequestException('User is deleted or does not exist.');
    }

    const now = Date.now();

    return await this._userRepo.save({ id, deleteTime: now, updateTime: now });
  }

  async exist(entityLike: Partial<User>): Promise<boolean> {
    const props = ObjectHelper.filterEmptyProps(User, entityLike);

    try {
      return await this._userRepo.exist({ where: { ...props, deleteTime: IsNull() } });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
