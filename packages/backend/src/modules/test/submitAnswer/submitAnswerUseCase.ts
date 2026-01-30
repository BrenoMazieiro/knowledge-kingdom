import type { ITestAnswerRepository, TestAnswerEntity } from '../repository/types';
import type { IQuestionOptionRepository } from '../../question/repository/types';
import type { ISubmitAnswerUseCase } from '../types';

export class SubmitAnswerUseCase implements ISubmitAnswerUseCase {
  constructor(
    private readonly testAnswerRepository: ITestAnswerRepository,
    private readonly questionOptionRepository: IQuestionOptionRepository,
  ) {}

  execute = async (_playerId: string, answerId: string, selectedOptionId: string): Promise<TestAnswerEntity> => {
    const answer = await this.testAnswerRepository.findOneById(answerId);
    const options = await this.questionOptionRepository.findByQuestionId(answer.questionId);
    const selectedOption = options.find((o) => o.id === selectedOptionId);
    const isCorrect = selectedOption?.isCorrect ?? false;
    return this.testAnswerRepository.submitAnswer(answerId, selectedOptionId, isCorrect);
  };
}
