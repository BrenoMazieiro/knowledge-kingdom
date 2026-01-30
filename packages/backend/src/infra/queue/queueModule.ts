import { redis } from '../redis/redisClient';
import { env } from '../config/env';
import type { RedisOptions } from 'ioredis';
import { TaskRegistry } from './taskRegistry';
import { createTaskQueue, createTaskWorker } from './queue';
import { SendGridEmailService } from '../email/emailService';
import { SEND_VERIFICATION_EMAIL_TASK } from '@kk/shared/constants/events';
import { createSendVerificationEmailHandler } from '../../modules/auth/tasks/sendVerificationEmailTask';
import { userRepository } from '../../modules/user/repository/userRepositoryModule';

const emailService = new SendGridEmailService(env.SENDGRID_API_KEY, env.SENDGRID_FROM_EMAIL);

const taskRegistry = new TaskRegistry();
taskRegistry.register(
  SEND_VERIFICATION_EMAIL_TASK,
  createSendVerificationEmailHandler(userRepository, emailService, env.FRONTEND_URL),
);

const workerRedisOpts: RedisOptions = { host: env.REDIS_HOST, port: env.REDIS_PORT };

export const taskQueue = createTaskQueue(redis);
export const taskWorker = createTaskWorker(workerRedisOpts, taskRegistry.getHandlers());
