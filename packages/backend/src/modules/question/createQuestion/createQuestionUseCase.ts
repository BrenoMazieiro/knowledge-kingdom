import type {
  IQuestionRepository,
  IQuestionOptionRepository,
  QuestionEntity,
  QuestionOptionEntity,
} from '../repository/types';
import type { ICreateQuestionUseCase } from '../types';

export class CreateQuestionUseCase implements ICreateQuestionUseCase {
  constructor(
    private readonly questionRepository: IQuestionRepository,
    private readonly questionOptionRepository: IQuestionOptionRepository,
  ) {}

  execute = async (
    houseId: string,
    creatorId: string,
    text: string,
    difficulty: string,
    explanation: string | null,
    options: { text: string; isCorrect: boolean }[],
  ): Promise<{ question: QuestionEntity; options: QuestionOptionEntity[] }> => {
    const question = await this.questionRepository.create({
      houseId,
      creatorId,
      text,
      difficulty,
      explanation,
    });

    const createdOptions = await this.questionOptionRepository.insertMany(
      options.map((opt, index) => ({
        questionId: question.id,
        text: opt.text,
        isCorrect: opt.isCorrect,
        sortOrder: index,
      })),
    );

    return { question, options: createdOptions };
  };
}
