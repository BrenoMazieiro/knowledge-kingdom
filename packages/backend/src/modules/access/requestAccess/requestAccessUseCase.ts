import { DomainError } from '../../../infra/errors/domainError';
import type { IAccessRequestRepository, AccessRequestEntity } from '../repository/types';
import type { IRequestAccessUseCase } from '../types';

export class RequestAccessUseCase implements IRequestAccessUseCase {
  constructor(private readonly accessRequestRepository: IAccessRequestRepository) {}

  execute = async (playerId: string, entityType: string, entityId: string): Promise<AccessRequestEntity> => {
    const existing = await this.accessRequestRepository.findByPlayerAndEntity(playerId, entityType, entityId);
    if (existing && existing.status === 'PENDING') {
      throw new DomainError('REQUEST_ALREADY_PENDING', 'You already have a pending access request');
    }
    return this.accessRequestRepository.create({ playerId, entityType, entityId });
  };
}
