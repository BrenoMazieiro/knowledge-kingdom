import type { IContentRepository, ContentEntity } from '../repository/types';

export interface ICreateContentUseCase {
  execute: (houseId: string, creatorId: string, title: string, type: string, url: string | null, body: string | null, description: string | null) => Promise<ContentEntity>;
}

export class CreateContentUseCase implements ICreateContentUseCase {
  constructor(private readonly contentRepository: IContentRepository) {}

  execute = async (houseId: string, creatorId: string, title: string, type: string, url: string | null, body: string | null, description: string | null): Promise<ContentEntity> => {
    return this.contentRepository.create({ houseId, creatorId, title, type, url, body, description });
  };
}
