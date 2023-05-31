import { CreateUserDto } from '../../dtos/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '@models/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly _userRepo: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    this._userRepo.create(createUserDto);
  }
}
