import { UserController } from './controllers/user/user.controller';
import { EncryptService } from '../security/services/encrypt/encrypt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RoleService } from '../security/services/role/role.service';
import { UserService } from './services/user/user.service';
import { Module } from '@nestjs/common';
import { User } from '@models/user.entity';
import { Role } from '@models/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), ConfigModule],
  controllers: [UserController],
  providers: [UserService, RoleService, EncryptService],
})
export class UserModule {}
