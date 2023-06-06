import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { CommonModule } from './common/common.module';
import { AIModule } from './ai/ai.module';

@Module({
  imports: [AIModule, ConfigModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
