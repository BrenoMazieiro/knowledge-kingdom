import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(4000),
  DATABASE_HOST: z.string().default('localhost'),
  DATABASE_PORT: z.coerce.number().default(5432),
  DATABASE_USER: z.string().default('kk'),
  DATABASE_PASSWORD: z.string().default('kk_dev_password'),
  DATABASE_NAME: z.string().default('the_knowledge_kingdom'),
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.coerce.number().default(6379),
  SESSION_SECRET: z.string().min(32).default('change-me-to-a-random-string-at-least-32-chars'),
  SESSION_MAX_AGE_MS: z.coerce.number().default(7 * 24 * 60 * 60 * 1000),
  SENDGRID_API_KEY: z.string().default(''),
  SENDGRID_FROM_EMAIL: z.string().email().default('noreply@theknowledgekingdom.com'),
  FRONTEND_URL: z.string().url().default('http://app.localhost'),
});

export const env = envSchema.parse(process.env);
export type Env = z.infer<typeof envSchema>;
