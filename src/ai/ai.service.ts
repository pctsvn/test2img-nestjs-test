/* eslint-disable prefer-destructuring */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import axios from 'axios';
import sdConfig from '../config/stableDiffusion.config';

@Injectable()
export class AIService {
  constructor(
    @Inject(sdConfig.KEY)
    private readonly config: ConfigType<typeof sdConfig>,
  ) {}
  async text2img(text: string) {
    try {
      const apiKey = this.config.sdKey;
      const numberOfPics = 4; //Limitation of 4 maximum image generation per call observed.
      const bodyInfo = JSON.stringify({
        key: apiKey,
        prompt: text,
        negative_prompt:
          '((out of frame)), ((extra fingers)), mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), (((tiling))), ((naked)), ((tile)), ((fleshpile)), ((ugly)), (((abstract))), blurry, ((bad anatomy)), ((bad proportions)), ((extra limbs)), cloned face, (((skinny))), glitchy, ((extra breasts)), ((double torso)), ((extra arms)), ((extra hands)), ((mangled fingers)), ((missing breasts)), (missing lips), ((ugly face)), ((fat)), ((extra legs)), anime',
        width: '512',
        height: '512',
        samples: numberOfPics,
        num_inference_steps: '30',
        safety_checker: 'no',
        enhance_prompt: 'yes',
        seed: null,
        guidance_scale: 7.5,
        webhook: null,
        track_id: null,
      });
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const result = await axios.post(
        'https://stablediffusionapi.com/api/v3/text2img',
        bodyInfo,
        options,
      );
      if ((result?.data?.output || []).length) {
        return result.data.output;
      }
      throw new Error('Something when wrong');
    } catch (error) {
      throw new HttpException(error.message || 'Error', HttpStatus.BAD_REQUEST);
    }
  }
}
