import type { AccessRequestEntity } from './repository/types';

export type AccessRequestDTO = {
  id: string;
  playerId: string;
  entityType: string;
  entityId: string;
  status: string;
  responseReason: string | null;
  respondedById: string | null;
  requestedAt: Date;
  respondedAt: Date | null;
};

export interface IRequestAccessUseCase {
  execute: (playerId: string, entityType: string, entityId: string) => Promise<AccessRequestEntity>;
}

export interface IRespondToAccessRequestUseCase {
  execute: (responderId: string, requestId: string, approved: boolean, reason?: string) => Promise<AccessRequestEntity>;
}

export interface IGetAccessRequestsUseCase {
  execute: (entityType: string, entityId: string) => Promise<AccessRequestEntity[]>;
}
