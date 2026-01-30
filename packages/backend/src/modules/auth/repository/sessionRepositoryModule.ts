import { redis } from '../../../infra/redis/redisClient';
import { env } from '../../../infra/config/env';
import { SessionRepository } from './sessionRepository';

export const sessionRepository = new SessionRepository(redis, env.SESSION_MAX_AGE_MS);
