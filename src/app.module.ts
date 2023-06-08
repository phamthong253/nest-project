import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseMapperInterceptor } from './shared/interceptors/response-mapper/response-mapper.interceptor';
import { CommissionModule } from './modules/commission/commission.module';
import { PermissionGuard } from './shared/guards/permission/permission.guard';
import { SecurityModule } from './modules/security/security.module';
import { DatabaseModule } from './database/database.module';
import { JwtAuthGuard } from './shared/guards/auth/auth.guard';
import { ConfigModule } from '@nestjs/config';
import { appConfigs } from '@config/environment/app.configuration';
import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule.forRoot({ load: appConfigs, isGlobal: true }), DatabaseModule, CommissionModule, UserModule, SecurityModule],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: PermissionGuard },
    { provide: APP_INTERCEPTOR, useClass: ResponseMapperInterceptor },
  ],
})
export class AppModule {}
