import type { IQuestionRepository, QuestionEntity } from '../repository/types';
import type { IGetQuestionsUseCase } from '../types';

export class GetQuestionsUseCase implements IGetQuestionsUseCase {
  constructor(private readonly questionRepository: IQuestionRepository) {}

  execute = async (houseId: string): Promise<QuestionEntity[]> => {
    return this.questionRepository.findByHouseId(houseId);
  };
}
