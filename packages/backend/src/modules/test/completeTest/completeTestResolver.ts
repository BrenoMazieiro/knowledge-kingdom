import type { GraphQLContext } from '../../../context';
import type { ICompleteTestUseCase, TestSessionDTO } from '../types';
import type { TestSessionEntity } from '../repository/types';
import { requirePlayerNotBlocked } from '../../../infra/auth/guards';

export class CompleteTestResolver {
  constructor(private readonly completeTestUseCase: ICompleteTestUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { testSessionId: string },
    context: GraphQLContext,
  ): Promise<TestSessionDTO> => {
    const userId = requirePlayerNotBlocked(context);
    const session = await this.completeTestUseCase.execute(userId, args.testSessionId);
    return this.mapToDto(session);
  };

  private mapToDto(e: TestSessionEntity): TestSessionDTO {
    return {
      id: e.id,
      playerId: e.playerId,
      houseId: e.houseId,
      attemptNumber: e.attemptNumber,
      questionCount: e.questionCount,
      correctCount: e.correctCount,
      scorePercentage: e.scorePercentage,
      tierAchieved: e.tierAchieved,
      quillsEarned: e.quillsEarned,
      isFirstOfDay: e.isFirstOfDay,
      startedAt: e.startedAt,
      completedAt: e.completedAt,
    };
  }
}
