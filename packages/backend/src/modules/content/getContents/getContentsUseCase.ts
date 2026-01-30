import type { IContentRepository, ContentEntity } from '../repository/types';

export interface IGetContentsUseCase {
  execute: (houseId: string) => Promise<ContentEntity[]>;
}

export class GetContentsUseCase implements IGetContentsUseCase {
  constructor(private readonly contentRepository: IContentRepository) {}

  execute = async (houseId: string): Promise<ContentEntity[]> => {
    return this.contentRepository.findManyByHouseId(houseId);
  };
}
