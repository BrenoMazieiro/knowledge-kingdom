import type { GraphQLContext } from '../../../context';
import type { ISubmitAnswerUseCase, TestAnswerDTO } from '../types';
import type { TestAnswerEntity } from '../repository/types';
import { requirePlayerNotBlocked } from '../../../infra/auth/guards';

export class SubmitAnswerResolver {
  constructor(private readonly submitAnswerUseCase: ISubmitAnswerUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { answerId: string; selectedOptionId: string },
    context: GraphQLContext,
  ): Promise<TestAnswerDTO> => {
    const userId = requirePlayerNotBlocked(context);
    const answer = await this.submitAnswerUseCase.execute(userId, args.answerId, args.selectedOptionId);
    return this.mapToDto(answer);
  };

  private mapToDto(e: TestAnswerEntity): TestAnswerDTO {
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
