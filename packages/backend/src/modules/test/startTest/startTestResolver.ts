import type { GraphQLContext } from '../../../context';
import type { IStartTestUseCase } from '../types';
import type { TestSessionDTO, TestAnswerDTO } from '../types';
import type { TestSessionEntity, TestAnswerEntity } from '../repository/types';
import { requirePlayerNotBlocked } from '../../../infra/auth/guards';

export class StartTestResolver {
  constructor(private readonly startTestUseCase: IStartTestUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { houseId: string },
    context: GraphQLContext,
  ): Promise<{ session: TestSessionDTO; answers: TestAnswerDTO[] }> => {
    const userId = requirePlayerNotBlocked(context);
    const result = await this.startTestUseCase.execute(userId, args.houseId);
    return {
      session: this.mapSessionDto(result.session),
      answers: result.answers.map((a) => this.mapAnswerDto(a)),
    };
  };

  private mapSessionDto(e: TestSessionEntity): TestSessionDTO {
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

  private mapAnswerDto(e: TestAnswerEntity): TestAnswerDTO {
    return {
      id: e.id,
      testSessionId: e.testSessionId,
      questionId: e.questionId,
      selectedOptionId: e.selectedOptionId,
      isCorrect: e.isCorrect,
      answeredAt: e.answeredAt,
    };
  }
}
