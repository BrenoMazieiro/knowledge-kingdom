import type { IKingdomRepository, KingdomEntity, KingdomEntityUpdate } from '../repository/types';

export interface IUpdateKingdomUseCase {
  execute: (id: string, version: number, data: KingdomEntityUpdate) => Promise<KingdomEntity>;
}

export class UpdateKingdomUseCase implements IUpdateKingdomUseCase {
  constructor(private readonly kingdomRepository: IKingdomRepository) {}

  execute = async (id: string, version: number, data: KingdomEntityUpdate): Promise<KingdomEntity> => {
    return this.kingdomRepository.update(id, version, data);
  };
}
