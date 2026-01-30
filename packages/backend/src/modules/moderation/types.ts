import type { AuditLogEntity, BlockRecordEntity } from './repository/types';

export type AuditLogDTO = {
  id: string;
  managerId: string;
  actionType: string;
  entityType: string;
  entityId: string;
  reason: string | null;
  createdAt: Date;
};

export type BlockRecordDTO = {
  id: string;
  entityType: string;
  entityId: string;
  blockedById: string;
  reason: string;
  presetMessage: string | null;
  blockedAt: Date;
  unblockedAt: Date | null;
  unblockedById: string | null;
};

export interface IGetAuditLogUseCase {
  execute: (entityType: string, entityId: string) => Promise<AuditLogEntity[]>;
}

export interface IGetBlockRecordsUseCase {
  execute: (entityType: string, entityId: string) => Promise<BlockRecordEntity[]>;
}
