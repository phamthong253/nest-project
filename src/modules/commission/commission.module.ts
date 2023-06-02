import { CommissionTypeController } from './controllers/commission-type/commission-type.controller';
import { CommissionTypeService } from './services/commission-type/commission-type.service';
import { CommissionController } from './controllers/commission/commission.controller';
import { CommissionService } from './services/commission/commission.service';
import { CommissionType } from '@models/comission-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commission } from '@models/commission.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Commission, CommissionType])],
  controllers: [CommissionController, CommissionTypeController],
  providers: [CommissionService, CommissionTypeService],
})
export class CommissionModule {}
