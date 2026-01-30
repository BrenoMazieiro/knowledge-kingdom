import type { GraphQLContext } from '../../../context';
import type { IGetKingdomUseCase } from './getKingdomUseCase';
import type { KingdomDTO } from '../types';
import type { KingdomEntity } from '../repository/types';

export class GetKingdomResolver {
  constructor(private readonly getKingdomUseCase: IGetKingdomUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { id: string },
    _context: GraphQLContext,
  ): Promise<KingdomDTO> => {
    const kingdom = await this.getKingdomUseCase.execute(args.id);
    return this.mapToDto(kingdom);
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
