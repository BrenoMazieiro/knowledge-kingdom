export type AuditLogEntity = {
  id: string;
  managerId: string;
  actionType: string;
  entityType: string;
  entityId: string;
  beforeState: unknown;
  afterState: unknown;
  reason: string | null;
  createdAt: Date;
};

export type BlockRecordEntity = {
  id: string;
  entityType: string;
  entityId: string;
  blockedById: string;
  reason: string;
  presetMessage: string | null;
  blockedAt: Date;
  unblockedAt: Date | null;
  unblockedById: string | null;
  createdAt: Date;
};

export interface IAuditLogRepository {
  findByEntity: (entityType: string, entityId: string) => Promise<AuditLogEntity[]>;
  create: (data: {
    managerId: string;
    actionType: string;
    entityType: string;
    entityId: string;
    beforeState?: unknown;
    afterState?: unknown;
    reason?: string;
  }) => Promise<AuditLogEntity>;
}

export interface IBlockRecordRepository {
  findByEntity: (entityType: string, entityId: string) => Promise<BlockRecordEntity[]>;
  create: (data: {
    entityType: string;
    entityId: string;
    blockedById: string;
    reason: string;
    presetMessage?: string;
  }) => Promise<BlockRecordEntity>;
  unblock: (id: string, unblockedById: string) => Promise<BlockRecordEntity>;
}
