import { randomUUID } from 'node:crypto';
import type { Redis } from 'ioredis';
import type { BMSessionEntity, IBMSessionRepository } from './types';

export class BMSessionRepository implements IBMSessionRepository {
  constructor(
    private readonly redis: Redis,
    private readonly maxAgeMs: number,
  ) {}

  private sessionKey(sessionId: string): string {
    return `bm_session:${sessionId}`;
  }

  private bmSessionsKey(bmId: string): string {
    return `bm_sessions:${bmId}`;
  }

  create = async (data: BMSessionEntity): Promise<string> => {
    const sessionId = randomUUID();
    const ttlSeconds = Math.floor(this.maxAgeMs / 1000);

    const pipeline = this.redis.pipeline();
    pipeline.set(this.sessionKey(sessionId), JSON.stringify(data), 'EX', ttlSeconds);
    pipeline.sadd(this.bmSessionsKey(data.bmId), sessionId);
    pipeline.expire(this.bmSessionsKey(data.bmId), ttlSeconds);
    await pipeline.exec();

    return sessionId;
  };

  findById = async (sessionId: string): Promise<BMSessionEntity | null> => {
    const raw = await this.redis.get(this.sessionKey(sessionId));
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    return {
      bmId: String(parsed.bmId),
      permissionLevel: String(parsed.permissionLevel),
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
      pipeline.srem(this.bmSessionsKey(session.bmId), sessionId);
    }
    await pipeline.exec();
  };

  destroyByBMId = async (bmId: string): Promise<void> => {
    const sessionIds = await this.redis.smembers(this.bmSessionsKey(bmId));
    if (sessionIds.length === 0) {
      return;
    }
    const pipeline = this.redis.pipeline();
    for (const sessionId of sessionIds) {
      pipeline.del(this.sessionKey(sessionId));
    }
    pipeline.del(this.bmSessionsKey(bmId));
    await pipeline.exec();
  };
}
