import { Module } from '@nestjs/common';
import { AIController } from './ai.controller';
import { AIService } from './ai.service';

@Module({
  imports: [],
  providers: [AIService],
  controllers: [AIController],
  exports: [AIService],
})
export class AIModule {}
