import type { IKingdomRepository, KingdomEntity } from '../repository/types';

export interface IGetKingdomsUseCase {
  execute: () => Promise<KingdomEntity[]>;
}

export class GetKingdomsUseCase implements IGetKingdomsUseCase {
  constructor(private readonly kingdomRepository: IKingdomRepository) {}

  execute = async (): Promise<KingdomEntity[]> => {
    return this.kingdomRepository.findAll();
  };
}
