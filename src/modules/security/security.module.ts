import { PermissionController } from './controllers/permission/permission.controller';
import { PermissionService } from './services/permission/permission.service';
import { RoleController } from './controllers/role/role.controller';
import { EncryptService } from './services/encrypt/encrypt.service';
import { AuthController } from './controllers/auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/shared/passport-strategy/jwt.strategy';
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
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('encrypt.secretKey'),
        signOptions: { expiresIn: configService.get<number>('encrypt.secretKeyExpr') ?? '60s' },
      }),
    }),
  ],
  controllers: [RoleController, PermissionController, AuthController],
  providers: [PermissionService, RoleService, UserService, EncryptService, AuthService, JwtStrategy],
  exports: [JwtModule],
})
export class SecurityModule {}
