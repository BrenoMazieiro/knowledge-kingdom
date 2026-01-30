import type { IKingdomRepository, KingdomEntity } from '../repository/types';

export interface ICreateKingdomUseCase {
  execute: (name: string, description: string | null, iconUrl: string | null) => Promise<KingdomEntity>;
}

export class CreateKingdomUseCase implements ICreateKingdomUseCase {
  constructor(private readonly kingdomRepository: IKingdomRepository) {}

  execute = async (name: string, description: string | null, iconUrl: string | null): Promise<KingdomEntity> => {
    return this.kingdomRepository.create({ name, description, iconUrl });
  };
}
