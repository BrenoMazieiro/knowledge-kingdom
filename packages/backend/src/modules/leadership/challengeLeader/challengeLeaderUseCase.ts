import { DuelStatus } from '@kk/shared/constants/enums';
import { QUILL_COSTS, DUEL_COOLDOWN_DAYS } from '@kk/shared/constants/quills';
import { DomainError } from '../../../infra/errors/domainError';
import type { ILeadershipTitleRepository, IDuelChallengeRepository, DuelChallengeEntity } from '../repository/types';
import type { IWalletRepository } from '../../wallet/repository/types';
import type { IChallengeLeaderUseCase } from '../types';

export class ChallengeLeaderUseCase implements IChallengeLeaderUseCase {
  constructor(
    private readonly leadershipTitleRepository: ILeadershipTitleRepository,
    private readonly duelChallengeRepository: IDuelChallengeRepository,
    private readonly walletRepository: IWalletRepository,
  ) {}

  execute = async (challengerId: string, entityType: string, entityId: string): Promise<DuelChallengeEntity> => {
    const title = await this.leadershipTitleRepository.findByEntity(entityType, entityId);
    if (!title) {
      throw new DomainError('NO_LEADER', 'This entity has no leader to challenge');
    }
    if (title.playerId === challengerId) {
      throw new DomainError('CANNOT_CHALLENGE_SELF', 'You cannot challenge yourself');
    }

    // Check pending duels
    const pending = await this.duelChallengeRepository.findByEntityAndStatus(entityType, entityId, DuelStatus.PENDING);
    if (pending.length > 0) {
      throw new DomainError('DUEL_ALREADY_PENDING', 'There is already a pending duel for this position');
    }

    const cost = entityType === 'KINGDOM' ? QUILL_COSTS.CHALLENGE_KING_QUEEN : QUILL_COSTS.CHALLENGE_CHANCELLOR;

    await this.walletRepository.debit(challengerId, cost, `Duel challenge for ${entityType}`, entityType, entityId);

    const nextAvailable = new Date();
    nextAvailable.setDate(nextAvailable.getDate() + DUEL_COOLDOWN_DAYS);

    return this.duelChallengeRepository.create({
      entityType,
      entityId,
      challengerId,
      defenderId: title.playerId,
      status: DuelStatus.PENDING,
      quillsCost: cost,
      nextChallengeAvailableAt: nextAvailable,
    });
  };
}
