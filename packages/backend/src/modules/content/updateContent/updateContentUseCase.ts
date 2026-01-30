import type { IContentRepository, ContentEntity, ContentEntityUpdate } from '../repository/types';

export interface IUpdateContentUseCase {
  execute: (id: string, version: number, data: ContentEntityUpdate) => Promise<ContentEntity>;
}

export class UpdateContentUseCase implements IUpdateContentUseCase {
  constructor(private readonly contentRepository: IContentRepository) {}

  execute = async (id: string, version: number, data: ContentEntityUpdate): Promise<ContentEntity> => {
    return this.contentRepository.update(id, version, data);
  };
}
