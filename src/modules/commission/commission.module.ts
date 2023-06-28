import { CommissionTypeController } from './controllers/commission-type/commission-type.controller';
import { CommissionTypeService } from './services/commission-type/commission-type.service';
import { CommissionController } from './controllers/commission/commission.controller';
import { CommissionService } from './services/commission/commission.service';
import { CommissionType } from '@models/commission-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commission } from '@models/commission.entity';
import { Module } from '@nestjs/common';
import { Permission } from '@models/permission.entity';
import { PermissionService } from '../security/services/permission/permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([Commission, CommissionType, Permission])],
  controllers: [CommissionController, CommissionTypeController],
  providers: [CommissionService, CommissionTypeService, PermissionService],
})
export class CommissionModule {}
