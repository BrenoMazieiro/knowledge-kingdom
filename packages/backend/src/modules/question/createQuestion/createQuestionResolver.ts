import { createQuestionInputSchema } from '@kk/shared/schemas/question';
import { BMPermissionLevel } from '@kk/shared/constants/enums';
import type { GraphQLContext } from '../../../context';
import type { ICreateQuestionUseCase, QuestionWithOptionsDTO } from '../types';
import type { QuestionEntity, QuestionOptionEntity } from '../repository/types';
import { requireBMPermission, requirePlayerNotBlocked } from '../../../infra/auth/guards';

export class CreateQuestionResolver {
  constructor(private readonly createQuestionUseCase: ICreateQuestionUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { input: unknown },
    context: GraphQLContext,
  ): Promise<QuestionWithOptionsDTO> => {
    const userId = context.bmId
      ? requireBMPermission(context, BMPermissionLevel.EDITOR)
      : requirePlayerNotBlocked(context);

    const input = createQuestionInputSchema.parse(args.input);
    const { question, options } = await this.createQuestionUseCase.execute(
      input.houseId,
      userId,
      input.text,
      input.difficulty,
      input.explanation ?? null,
      input.options,
    );
    return this.mapToDto(question, options);
  };

  private mapToDto(question: QuestionEntity, options: QuestionOptionEntity[]): QuestionWithOptionsDTO {
    return {
      id: question.id,
      version: question.version,
      houseId: question.houseId,
      creatorId: question.creatorId,
      text: question.text,
      difficulty: question.difficulty,
      explanation: question.explanation,
      sortOrder: question.sortOrder,
      createdAt: question.createdAt,
      options: options.map((o) => ({
        id: o.id,
        questionId: o.questionId,
        text: o.text,
        isCorrect: o.isCorrect,
        sortOrder: o.sortOrder,
      })),
    };
  }
}
