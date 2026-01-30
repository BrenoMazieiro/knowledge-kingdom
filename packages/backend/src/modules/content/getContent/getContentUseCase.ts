import type { IContentRepository, ContentEntity } from '../repository/types';

export interface IGetContentUseCase {
  execute: (id: string) => Promise<ContentEntity>;
}

export class GetContentUseCase implements IGetContentUseCase {
  constructor(private readonly contentRepository: IContentRepository) {}

  execute = async (id: string): Promise<ContentEntity> => {
    return this.contentRepository.findOneById(id);
  };
}
