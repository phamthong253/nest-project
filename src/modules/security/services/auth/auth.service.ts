import { BadRequestException, Injectable } from '@nestjs/common';
import { PermissionService } from '../permission/permission.service';
import { EncryptService } from '../encrypt/encrypt.service';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { SignInResDto } from '../../dtos/sign-in-res.dto';
import { ObjectHelper } from '@helpers/object.helper';
import { UserService } from 'src/modules/user/services/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@models/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _permissionService: PermissionService,
    private readonly _encryptService: EncryptService,
    private readonly _jwtService: JwtService,
  ) {}

  checkUser(entityLike: Pick<User, 'email' | 'username'>): Promise<boolean> {
    return this._userService.exist(ObjectHelper.filterEmptyProps(User, entityLike));
  }

  async checkUserAccess(id: string, required: string[]): Promise<boolean> {
    const permissions = await this._permissionService.findByUserId(id);

    return required.every((permission) => permissions.includes(permission));
  }

  async signIn(username: string, pass: string): Promise<any> {
    const user = (await this._userService.findBy({ username }, { password: true })) as User | null;

    if (!user) {
      throw new BadRequestException('username does not exist.');
    }

    const isMatched = await this._encryptService.compare(pass, user.password);

    if (!isMatched) {
      throw new BadRequestException('Wrong password.');
    }

    return new SignInResDto({ accessToken: await this._jwtService.signAsync({ sub: user.id, username: user.username }) });
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this._userService.create(createUserDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
