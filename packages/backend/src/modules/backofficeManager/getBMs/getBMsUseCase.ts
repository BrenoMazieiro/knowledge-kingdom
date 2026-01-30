import type { IBMRepository, BMEntity } from '../repository/types';
import type { IGetBMsUseCase } from '../types';

export class GetBMsUseCase implements IGetBMsUseCase {
  constructor(private readonly bmRepository: IBMRepository) {}

  execute = async (): Promise<BMEntity[]> => {
    return this.bmRepository.findAll();
  };
}
