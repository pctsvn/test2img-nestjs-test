import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AIService } from './ai.service';

@ApiTags('ai')
@Controller('ai')
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @ApiOperation({
    summary: 'Text to image',
    description: '',
  })
  @Post('text2img')
  async text2img(@Body() body: any): Promise<string[]> {
    return await this.aiService.text2img(body.text);
  }
}
