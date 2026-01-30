import { QUILL_COSTS } from '@kk/shared/constants/quills';
import { DomainError } from '../../../infra/errors/domainError';
import type { ITestSessionRepository, ITestAnswerRepository, TestSessionEntity, TestAnswerEntity } from '../repository/types';
import type { IHouseEntryRepository } from '../../houseEntry/repository/types';
import type { IQuestionRepository } from '../../question/repository/types';
import type { IWalletRepository } from '../../wallet/repository/types';
import type { IHouseRepository } from '../../house/repository/types';
import type { IStartTestUseCase } from '../types';

export class StartTestUseCase implements IStartTestUseCase {
  constructor(
    private readonly testSessionRepository: ITestSessionRepository,
    private readonly testAnswerRepository: ITestAnswerRepository,
    private readonly houseEntryRepository: IHouseEntryRepository,
    private readonly questionRepository: IQuestionRepository,
    private readonly walletRepository: IWalletRepository,
    private readonly houseRepository: IHouseRepository,
  ) {}

  execute = async (playerId: string, houseId: string): Promise<{ session: TestSessionEntity; answers: TestAnswerEntity[] }> => {
    // Verify player has entered house
    const entry = await this.houseEntryRepository.findByPlayerAndHouse(playerId, houseId);
    if (!entry) {
      throw new DomainError('HOUSE_NOT_ENTERED', 'You must enter the house before taking a test');
    }

    const attemptCount = await this.testSessionRepository.countByPlayerAndHouse(playerId, houseId);
    const attemptNumber = attemptCount + 1;

    // Check retake rules
    if (attemptNumber >= 2) {
      let cost = 0;
      if (attemptNumber === 2) cost = QUILL_COSTS.RETAKE_2;
      else if (attemptNumber === 3) cost = QUILL_COSTS.RETAKE_3;
      else cost = QUILL_COSTS.RETAKE_4_PLUS;

      if (cost > 0) {
        await this.walletRepository.debit(playerId, cost, `Test retake #${attemptNumber}`, 'HOUSE', houseId);
      }
    }

    // Check daily bonus
    const hasCompletedToday = await this.testSessionRepository.hasCompletedToday(playerId);
    const isFirstOfDay = !hasCompletedToday;

    // Get house test config and select questions
    const house = await this.houseRepository.findOneById(houseId);
    const easyQuestions = await this.questionRepository.findRandomByHouseId(houseId, 'EASY', house.testEasyCount);
    const mediumQuestions = await this.questionRepository.findRandomByHouseId(houseId, 'MEDIUM', house.testMediumCount);
    const hardQuestions = await this.questionRepository.findRandomByHouseId(houseId, 'HARD', house.testHardCount);
    const allQuestions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];

    const session = await this.testSessionRepository.create({
      playerId,
      houseId,
      attemptNumber,
      questionCount: allQuestions.length,
      isFirstOfDay,
    });

    const answers = await this.testAnswerRepository.createMany(
      allQuestions.map((q) => ({ testSessionId: session.id, questionId: q.id })),
    );

    return { session, answers };
  };
}
