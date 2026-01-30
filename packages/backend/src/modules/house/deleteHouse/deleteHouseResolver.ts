import type { GraphQLContext } from '../../../context';
import type { IDeleteHouseUseCase } from './deleteHouseUseCase';
import { requireBMPermission } from '../../../infra/auth/guards';
import { BMPermissionLevel } from '@kk/shared/constants/enums';

export class DeleteHouseResolver {
  constructor(private readonly deleteHouseUseCase: IDeleteHouseUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { id: string; version: number },
    context: GraphQLContext,
  ): Promise<boolean> => {
    requireBMPermission(context, BMPermissionLevel.EDITOR);
    await this.deleteHouseUseCase.execute(args.id, args.version);
    return true;
  };
}
