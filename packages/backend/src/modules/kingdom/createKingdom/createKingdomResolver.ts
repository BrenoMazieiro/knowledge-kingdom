import { createKingdomInputSchema } from '@kk/shared/schemas/kingdom';
import type { GraphQLContext } from '../../../context';
import type { ICreateKingdomUseCase } from './createKingdomUseCase';
import type { KingdomDTO } from '../types';
import type { KingdomEntity } from '../repository/types';
import { requireBMPermission } from '../../../infra/auth/guards';
import { BMPermissionLevel } from '@kk/shared/constants/enums';

export class CreateKingdomResolver {
  constructor(private readonly createKingdomUseCase: ICreateKingdomUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { input: unknown },
    context: GraphQLContext,
  ): Promise<KingdomDTO> => {
    requireBMPermission(context, BMPermissionLevel.EDITOR);
    const input = createKingdomInputSchema.parse(args.input);
    const kingdom = await this.createKingdomUseCase.execute(
      input.name,
      input.description || null,
      input.iconUrl ?? null,
    );
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
