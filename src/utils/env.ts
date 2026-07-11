import 'dotenv/config';
import { z } from 'zod';
import { EnvironmentError } from '../errors/environment-error.js';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().nonempty(),
  PORT: z.coerce.number().default(3000),
  JWT_SECRET: z.string().nonempty(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format());

  throw new EnvironmentError();
}

export const env = _env.data;
