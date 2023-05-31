import { CommissionModule } from './modules/commission/commission.module';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// configs
import databaseConfiguration from './shared/config/database.configuration';
import serverConfiguration from './shared/config/server.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [serverConfiguration, databaseConfiguration] }),
    DatabaseModule,
    CommissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
