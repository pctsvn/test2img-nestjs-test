import { registerAs } from '@nestjs/config';

export default registerAs('stableDiffusion', () => ({
  sdKey:
    process.env.STABLE_DIFFUSION_KEY ||
    'MpKrKFBeRCb3rwAoXqIMuxHGBvRZXzuIH2s7bXzbvyo2PKARhyRWDGBWIfJh',
}));
