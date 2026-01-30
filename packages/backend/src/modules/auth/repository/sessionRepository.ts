import { randomUUID } from 'node:crypto';
import type { Redis } from 'ioredis';
import type { SessionEntity, ISessionRepository } from './types';

export class SessionRepository implements ISessionRepository {
  constructor(
    private readonly redis: Redis,
    private readonly maxAgeMs: number,
  ) {}

  private sessionKey(sessionId: string): string {
    return `session:${sessionId}`;
  }

  private userSessionsKey(userId: string): string {
    return `user_sessions:${userId}`;
  }

  create = async (data: SessionEntity): Promise<string> => {
    const sessionId = randomUUID();
    const ttlSeconds = Math.floor(this.maxAgeMs / 1000);

    const pipeline = this.redis.pipeline();
    pipeline.set(this.sessionKey(sessionId), JSON.stringify(data), 'EX', ttlSeconds);
    pipeline.sadd(this.userSessionsKey(data.userId), sessionId);
    pipeline.expire(this.userSessionsKey(data.userId), ttlSeconds);
    await pipeline.exec();

    return sessionId;
  };

  findById = async (sessionId: string): Promise<SessionEntity | null> => {
    const raw = await this.redis.get(this.sessionKey(sessionId));
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    return {
      userId: String(parsed.userId),
    };
  };

  refresh = async (sessionId: string): Promise<void> => {
    const ttlSeconds = Math.floor(this.maxAgeMs / 1000);
    await this.redis.expire(this.sessionKey(sessionId), ttlSeconds);
  };

  destroy = async (sessionId: string): Promise<void> => {
    const session = await this.findById(sessionId);
    const pipeline = this.redis.pipeline();
    pipeline.del(this.sessionKey(sessionId));
    if (session) {
      pipeline.srem(this.userSessionsKey(session.userId), sessionId);
    }
    await pipeline.exec();
  };

  destroyByUserId = async (userId: string): Promise<void> => {
    const sessionIds = await this.redis.smembers(this.userSessionsKey(userId));
    if (sessionIds.length === 0) {
      return;
    }
    const pipeline = this.redis.pipeline();
    for (const sessionId of sessionIds) {
      pipeline.del(this.sessionKey(sessionId));
    }
    pipeline.del(this.userSessionsKey(userId));
    await pipeline.exec();
  };
}
