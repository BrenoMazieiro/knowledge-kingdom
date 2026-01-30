import type { Queue } from 'bullmq';
import type { TaskHandler } from './queue';

export class TaskRegistry {
  private readonly handlers = new Map<string, TaskHandler>();

  register(taskName: string, handler: TaskHandler): void {
    this.handlers.set(taskName, handler);
  }

  getHandlers(): Map<string, TaskHandler> {
    return this.handlers;
  }

  async enqueue(queue: Queue, taskName: string, payload: Record<string, unknown>): Promise<void> {
    await queue.add(taskName, payload, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    });
  }
}
