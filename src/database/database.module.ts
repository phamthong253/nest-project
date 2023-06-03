import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CommissionType } from '@models/commission-type.entity';
import { ConfigService } from '@nestjs/config';
import { Commission } from '@models/commission.entity';
import { Permission } from '@models/permission.entity';
import { Module } from '@nestjs/common';
import { User } from '@models/user.entity';
import { Role } from '@models/role.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: configService.get<string>('database.type') as any,
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        entities: [Commission, CommissionType, User, Permission, Role],
        synchronize: true,
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
