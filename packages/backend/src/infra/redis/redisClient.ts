import { Redis } from 'ioredis';
import { env } from '../config/env';

export const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
});

export const createRedisClient = (): Redis => {
  return new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
  });
};
