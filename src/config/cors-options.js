import { envs } from './envs.js';

export const corsOptions = {
  origin: envs.CORS_ORIGINS.split(','),
  credentials: true,
  optionsSuccessStatus: 204,
};
