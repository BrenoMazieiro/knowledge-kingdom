import { Queue, Worker } from 'bullmq';
import type { Redis, RedisOptions } from 'ioredis';

export const TASK_QUEUE_NAME = 'kk-tasks';

export const createTaskQueue = (connection: Redis): Queue => {
  return new Queue(TASK_QUEUE_NAME, { connection });
};

export type TaskHandler = (payload: Record<string, unknown>) => Promise<void>;

export const createTaskWorker = (
  connectionOpts: RedisOptions,
  handlers: Map<string, TaskHandler>,
): Worker<Record<string, unknown>> => {
  return new Worker<Record<string, unknown>>(
    TASK_QUEUE_NAME,
    async (job) => {
      const handler = handlers.get(job.name);
      if (!handler) {
        throw new Error(`No handler for task: ${job.name}`);
      }
      await handler(job.data);
    },
    {
      connection: { ...connectionOpts, maxRetriesPerRequest: null },
      concurrency: 5,
    },
  );
};
