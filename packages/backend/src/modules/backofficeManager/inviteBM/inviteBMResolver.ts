import { inviteBMInputSchema } from '@kk/shared/schemas/auth';
import { BMPermissionLevel } from '@kk/shared/constants/enums';
import type { GraphQLContext } from '../../../context';
import type { BMEntity } from '../repository/types';
import type { IInviteBMUseCase, BMDTO } from '../types';
import { requireBMPermission } from '../../../infra/auth/guards';

export class InviteBMResolver {
  constructor(private readonly inviteBMUseCase: IInviteBMUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { input: unknown },
    context: GraphQLContext,
  ): Promise<BMDTO> => {
    const bmId = requireBMPermission(context, BMPermissionLevel.ADMIN);
    const input = inviteBMInputSchema.parse(args.input);
    const bm = await this.inviteBMUseCase.execute(bmId, input.email, input.name, input.permissionLevel);
    return this.mapToDto(bm);
  };

  private mapToDto(entity: BMEntity): BMDTO {
    return {
      id: entity.id,
      email: entity.email,
      name: entity.name,
      permissionLevel: entity.permissionLevel,
      twoFactorEnabled: entity.twoFactorEnabled,
      createdAt: entity.createdAt,
    };
  }
}
