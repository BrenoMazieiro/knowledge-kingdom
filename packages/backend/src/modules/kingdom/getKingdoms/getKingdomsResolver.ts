import type { GraphQLContext } from '../../../context';
import type { IGetKingdomsUseCase } from './getKingdomsUseCase';
import type { KingdomDTO } from '../types';
import type { KingdomEntity } from '../repository/types';

export class GetKingdomsResolver {
  constructor(private readonly getKingdomsUseCase: IGetKingdomsUseCase) {}

  resolve = async (
    _parent: unknown,
    _args: unknown,
    _context: GraphQLContext,
  ): Promise<KingdomDTO[]> => {
    const kingdoms = await this.getKingdomsUseCase.execute();
    return kingdoms.map((entity) => this.mapToDto(entity));
  };

  private mapToDto(entity: KingdomEntity): KingdomDTO {
    return {
      id: entity.id,
      version: entity.version,
      name: entity.name,
      description: entity.description,
      iconUrl: entity.iconUrl,
      sortOrder: entity.sortOrder,
      creatorId: entity.creatorId,
      kingQueenId: entity.kingQueenId,
      visibility: entity.visibility,
      status: entity.status,
      treasuryBalance: entity.treasuryBalance,
      createdAt: entity.createdAt,
    };
  }
}
