import type { IQuestionRepository } from '../repository/types';
import type { IGetQuestionPoolUseCase, QuestionPoolDTO } from '../types';

export class GetQuestionPoolUseCase implements IGetQuestionPoolUseCase {
  constructor(private readonly questionRepository: IQuestionRepository) {}

  execute = async (houseId: string): Promise<QuestionPoolDTO> => {
    const counts = await this.questionRepository.countByHouseIdGroupedByDifficulty(houseId);
    const total = Object.values(counts).reduce((sum, c) => sum + c, 0);
    return { houseId, counts, total };
  };
}
