import { CommissionModule } from './modules/commission/commission.module';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule, CommissionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
