import type { IContentRepository } from '../repository/types';

export interface IDeleteContentUseCase {
  execute: (id: string, version: number) => Promise<void>;
}

export class DeleteContentUseCase implements IDeleteContentUseCase {
  constructor(private readonly contentRepository: IContentRepository) {}

  execute = async (id: string, version: number): Promise<void> => {
    await this.contentRepository.softDelete(id, version);
  };
}
