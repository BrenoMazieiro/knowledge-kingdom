import { updateQuestionInputSchema } from '@kk/shared/schemas/question';
import { BMPermissionLevel } from '@kk/shared/constants/enums';
import type { GraphQLContext } from '../../../context';
import type { IUpdateQuestionUseCase, QuestionWithOptionsDTO } from '../types';
import type { QuestionEntity, QuestionOptionEntity } from '../repository/types';
import { requireBMPermission } from '../../../infra/auth/guards';

export class UpdateQuestionResolver {
  constructor(private readonly updateQuestionUseCase: IUpdateQuestionUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { input: unknown },
    context: GraphQLContext,
  ): Promise<QuestionWithOptionsDTO> => {
    requireBMPermission(context, BMPermissionLevel.EDITOR);
    const input = updateQuestionInputSchema.parse(args.input);
    const { id, version, options, ...data } = input;
    const result = await this.updateQuestionUseCase.execute(id, version, data, options);
    return this.mapToDto(result.question, result.options);
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
