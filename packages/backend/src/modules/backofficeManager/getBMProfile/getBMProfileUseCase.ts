import type { IBMRepository, BMEntity } from '../repository/types';
import type { IGetBMProfileUseCase } from '../types';

export class GetBMProfileUseCase implements IGetBMProfileUseCase {
  constructor(private readonly bmRepository: IBMRepository) {}

  execute = async (bmId: string): Promise<BMEntity> => {
    return this.bmRepository.findOneById(bmId);
  };
}
