import { registerAs } from '@nestjs/config';

export default registerAs('stableDiffusion', () => ({
  sdKey:
    process.env.STABLE_DIFFUSION_KEY ||
    'xMssv5iNBTrlVJdjlqZGDO6tgxHyq6a4pp2AlCU39B2owlPGURXERqOgDgy1',
}));
