import type { GraphQLContext } from '../../../context';
import type { IGetQuestionsUseCase, QuestionDTO } from '../types';
import type { QuestionEntity } from '../repository/types';
import { requireAuth, requireBMAuth } from '../../../infra/auth/guards';

export class GetQuestionsResolver {
  constructor(private readonly getQuestionsUseCase: IGetQuestionsUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { houseId: string },
    context: GraphQLContext,
  ): Promise<QuestionDTO[]> => {
    if (context.bmId) {
      requireBMAuth(context);
    } else {
      requireAuth(context);
    }
    const questions = await this.getQuestionsUseCase.execute(args.houseId);
    return questions.map((q) => this.mapToDto(q));
  };

  private mapToDto(entity: QuestionEntity): QuestionDTO {
    return {
      id: entity.id,
      version: entity.version,
      houseId: entity.houseId,
      creatorId: entity.creatorId,
      text: entity.text,
      difficulty: entity.difficulty,
      explanation: entity.explanation,
      sortOrder: entity.sortOrder,
      createdAt: entity.createdAt,
    };
  }
}
