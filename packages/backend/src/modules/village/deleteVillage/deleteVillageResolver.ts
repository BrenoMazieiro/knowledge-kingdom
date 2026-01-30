import type { GraphQLContext } from '../../../context';
import type { IDeleteVillageUseCase } from './deleteVillageUseCase';
import { requireBMPermission } from '../../../infra/auth/guards';
import { BMPermissionLevel } from '@kk/shared/constants/enums';

export class DeleteVillageResolver {
  constructor(private readonly deleteVillageUseCase: IDeleteVillageUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { id: string; version: number },
    context: GraphQLContext,
  ): Promise<boolean> => {
    requireBMPermission(context, BMPermissionLevel.EDITOR);
    await this.deleteVillageUseCase.execute(args.id, args.version);
    return true;
  };
}
