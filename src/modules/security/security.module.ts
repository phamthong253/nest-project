import { ConfigModule, ConfigService } from '@nestjs/config';
import { PermissionController } from './controllers/permission/permission.controller';
import { PermissionService } from './services/permission/permission.service';
import { RoleController } from './controllers/role/role.controller';
import { EncryptService } from './services/encrypt/encrypt.service';
import { AuthController } from './controllers/auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/services/user/user.service';
import { RoleService } from './services/role/role.service';
import { AuthService } from './services/auth/auth.service';
import { Permission } from '@models/permission.entity';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { Role } from '@models/role.entity';
import { User } from '@models/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Permission, User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('security.secretKey'),
        signOptions: { expiresIn: `${configService.get<number>('security.secretKeyExpr') ?? 0}s` },
      }),
    }),
  ],
  controllers: [RoleController, PermissionController, AuthController],
  providers: [PermissionService, RoleService, UserService, EncryptService, AuthService],
  exports: [JwtModule],
})
export class SecurityModule {}
