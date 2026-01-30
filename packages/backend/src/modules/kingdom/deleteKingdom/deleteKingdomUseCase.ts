import type { IKingdomRepository } from '../repository/types';

export interface IDeleteKingdomUseCase {
  execute: (id: string, version: number) => Promise<void>;
}

export class DeleteKingdomUseCase implements IDeleteKingdomUseCase {
  constructor(private readonly kingdomRepository: IKingdomRepository) {}

  execute = async (id: string, version: number): Promise<void> => {
    await this.kingdomRepository.softDelete(id, version);
  };
}
