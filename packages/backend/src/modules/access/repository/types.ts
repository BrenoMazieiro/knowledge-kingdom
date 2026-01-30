export type AccessRequestEntity = {
  id: string;
  playerId: string;
  entityType: string;
  entityId: string;
  status: string;
  responseReason: string | null;
  respondedById: string | null;
  requestedAt: Date;
  respondedAt: Date | null;
  createdAt: Date;
};

export interface IAccessRequestRepository {
  findByPlayerAndEntity: (playerId: string, entityType: string, entityId: string) => Promise<AccessRequestEntity | null>;
  findByEntity: (entityType: string, entityId: string, status?: string) => Promise<AccessRequestEntity[]>;
  create: (data: { playerId: string; entityType: string; entityId: string }) => Promise<AccessRequestEntity>;
  respond: (id: string, status: string, respondedById: string, reason?: string) => Promise<AccessRequestEntity>;
}
