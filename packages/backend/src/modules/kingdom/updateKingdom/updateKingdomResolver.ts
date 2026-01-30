import { updateKingdomInputSchema } from '@kk/shared/schemas/kingdom';
import type { GraphQLContext } from '../../../context';
import type { IUpdateKingdomUseCase } from './updateKingdomUseCase';
import type { KingdomDTO } from '../types';
import type { KingdomEntity } from '../repository/types';
import { requireBMPermission } from '../../../infra/auth/guards';
import { BMPermissionLevel } from '@kk/shared/constants/enums';

export class UpdateKingdomResolver {
  constructor(private readonly updateKingdomUseCase: IUpdateKingdomUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { input: unknown },
    context: GraphQLContext,
  ): Promise<KingdomDTO> => {
    requireBMPermission(context, BMPermissionLevel.EDITOR);
    const input = updateKingdomInputSchema.parse(args.input);
    const { id, version, ...updateData } = input;
    const kingdom = await this.updateKingdomUseCase.execute(id, version, updateData);
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
