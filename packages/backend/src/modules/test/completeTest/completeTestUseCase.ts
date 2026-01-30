import { QUILL_REWARDS, TIER_THRESHOLDS, DAILY_BONUS_QUILLS } from '@kk/shared/constants/quills';
import { ConquestTier } from '@kk/shared/constants/enums';
import { DomainError } from '../../../infra/errors/domainError';
import type { ITestSessionRepository, ITestAnswerRepository, TestSessionEntity } from '../repository/types';
import type { IWalletRepository } from '../../wallet/repository/types';
import type { ICompleteTestUseCase } from '../types';

export class CompleteTestUseCase implements ICompleteTestUseCase {
  constructor(
    private readonly testSessionRepository: ITestSessionRepository,
    private readonly testAnswerRepository: ITestAnswerRepository,
    private readonly walletRepository: IWalletRepository,
  ) {}

  execute = async (playerId: string, testSessionId: string): Promise<TestSessionEntity> => {
    const session = await this.testSessionRepository.findOneById(testSessionId);
    if (session.playerId !== playerId) {
      throw new DomainError('UNAUTHORIZED', 'This test session does not belong to you');
    }
    if (session.completedAt) {
      throw new DomainError('TEST_ALREADY_COMPLETED', 'This test has already been completed');
    }

    const answers = await this.testAnswerRepository.findByTestSessionId(testSessionId);
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const scorePercentage = session.questionCount > 0
      ? Math.round((correctCount / session.questionCount) * 100)
      : 0;

    // Determine tier
    let tierAchieved: string | null = null;
    if (scorePercentage >= TIER_THRESHOLDS.ARCHON) tierAchieved = ConquestTier.ARCHON;
    else if (scorePercentage >= TIER_THRESHOLDS.MAESTRO) tierAchieved = ConquestTier.MAESTRO;
    else if (scorePercentage >= TIER_THRESHOLDS.ADEPT) tierAchieved = ConquestTier.ADEPT;
    else if (scorePercentage >= TIER_THRESHOLDS.NOVICE) tierAchieved = ConquestTier.NOVICE;

    // Calculate quills earned
    let quillsEarned = 0;
    if (tierAchieved) {
      quillsEarned = QUILL_REWARDS[tierAchieved as keyof typeof QUILL_REWARDS] ?? 0;
    }
    if (session.isFirstOfDay) {
      quillsEarned += DAILY_BONUS_QUILLS;
    }

    // Credit quills
    if (quillsEarned > 0) {
      await this.walletRepository.credit(
        playerId,
        quillsEarned,
        `Test completed: ${tierAchieved ?? 'no tier'}`,
        'TEST_SESSION',
        testSessionId,
      );
    }

    return this.testSessionRepository.complete(testSessionId, correctCount, scorePercentage, tierAchieved, quillsEarned);
  };
}
