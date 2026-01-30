import type { IKingdomRepository, KingdomEntity } from '../repository/types';

export interface IGetKingdomUseCase {
  execute: (id: string) => Promise<KingdomEntity>;
}

export class GetKingdomUseCase implements IGetKingdomUseCase {
  constructor(private readonly kingdomRepository: IKingdomRepository) {}

  execute = async (id: string): Promise<KingdomEntity> => {
    return this.kingdomRepository.findOneById(id);
  };
}
