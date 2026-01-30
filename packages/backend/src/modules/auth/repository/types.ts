export type SessionEntity = {
  userId: string;
};

export interface ISessionRepository {
  create: (data: SessionEntity) => Promise<string>;
  findById: (sessionId: string) => Promise<SessionEntity | null>;
  refresh: (sessionId: string) => Promise<void>;
  destroy: (sessionId: string) => Promise<void>;
  destroyByUserId: (userId: string) => Promise<void>;
}
