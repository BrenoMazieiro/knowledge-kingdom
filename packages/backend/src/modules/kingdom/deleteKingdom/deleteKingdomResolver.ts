import type { GraphQLContext } from '../../../context';
import type { IDeleteKingdomUseCase } from './deleteKingdomUseCase';
import { requireBMPermission } from '../../../infra/auth/guards';
import { BMPermissionLevel } from '@kk/shared/constants/enums';

export class DeleteKingdomResolver {
  constructor(private readonly deleteKingdomUseCase: IDeleteKingdomUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { id: string; version: number },
    context: GraphQLContext,
  ): Promise<boolean> => {
    requireBMPermission(context, BMPermissionLevel.EDITOR);
    await this.deleteKingdomUseCase.execute(args.id, args.version);
    return true;
  };
}
