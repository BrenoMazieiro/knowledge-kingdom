import { redis } from '../../../infra/redis/redisClient';
import { env } from '../../../infra/config/env';
import { BMSessionRepository } from './bmSessionRepository';

export const bmSessionRepository = new BMSessionRepository(redis, env.SESSION_MAX_AGE_MS);
