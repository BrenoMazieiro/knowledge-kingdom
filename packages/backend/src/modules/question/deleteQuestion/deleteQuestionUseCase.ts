import type { IQuestionRepository } from '../repository/types';
import type { IDeleteQuestionUseCase } from '../types';

export class DeleteQuestionUseCase implements IDeleteQuestionUseCase {
  constructor(private readonly questionRepository: IQuestionRepository) {}

  execute = async (id: string, version: number): Promise<void> => {
    await this.questionRepository.softDelete(id, version);
  };
}
