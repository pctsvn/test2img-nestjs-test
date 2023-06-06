import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import Joi = require('@hapi/joi');

import sdConfig from './stableDiffusion.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [sdConfig],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().allow('DEV', 'TEST', 'PROD'),
        PORT: Joi.number().positive(),
      }),
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
