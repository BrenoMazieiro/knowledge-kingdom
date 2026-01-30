import type {
  IQuestionRepository,
  IQuestionOptionRepository,
  QuestionEntity,
  QuestionOptionEntity,
} from '../repository/types';
import type { IUpdateQuestionUseCase } from '../types';

export class UpdateQuestionUseCase implements IUpdateQuestionUseCase {
  constructor(
    private readonly questionRepository: IQuestionRepository,
    private readonly questionOptionRepository: IQuestionOptionRepository,
  ) {}

  execute = async (
    id: string,
    version: number,
    data: { text?: string; difficulty?: string; explanation?: string | null },
    options?: { text: string; isCorrect: boolean }[],
  ): Promise<{ question: QuestionEntity; options: QuestionOptionEntity[] }> => {
    const question = await this.questionRepository.update(id, version, data);

    let updatedOptions: QuestionOptionEntity[];
    if (options) {
      await this.questionOptionRepository.deleteByQuestionId(id);
      updatedOptions = await this.questionOptionRepository.insertMany(
        options.map((opt, index) => ({
          questionId: id,
          text: opt.text,
          isCorrect: opt.isCorrect,
          sortOrder: index,
        })),
      );
    } else {
      updatedOptions = await this.questionOptionRepository.findByQuestionId(id);
    }

    return { question, options: updatedOptions };
  };
}
