import { AcquiredMethod } from '@kk/shared/constants/enums';
import { DomainError } from '../../../infra/errors/domainError';
import type { ILeadershipTitleRepository, LeadershipTitleEntity } from '../repository/types';
import type { IClaimTitleUseCase } from '../types';

export class ClaimTitleUseCase implements IClaimTitleUseCase {
  constructor(private readonly leadershipTitleRepository: ILeadershipTitleRepository) {}

  execute = async (playerId: string, entityType: string, entityId: string): Promise<LeadershipTitleEntity> => {
    const existing = await this.leadershipTitleRepository.findByEntity(entityType, entityId);
    if (existing) {
      throw new DomainError('TITLE_ALREADY_CLAIMED', 'This entity already has a leader');
    }

    return this.leadershipTitleRepository.create({
      entityType,
      entityId,
      playerId,
      title: entityType === 'KINGDOM' ? 'KING_QUEEN' : entityType === 'VILLAGE' ? 'CHANCELLOR' : 'MANAGER',
      acquiredMethod: AcquiredMethod.CLAIM,
    });
  };
}
