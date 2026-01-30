import type { GraphQLContext } from '../../../context';
import type { IDeleteContentUseCase } from './deleteContentUseCase';
import { requireBMPermission } from '../../../infra/auth/guards';
import { BMPermissionLevel } from '@kk/shared/constants/enums';

export class DeleteContentResolver {
  constructor(private readonly deleteContentUseCase: IDeleteContentUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { id: string; version: number },
    context: GraphQLContext,
  ): Promise<boolean> => {
    requireBMPermission(context, BMPermissionLevel.EDITOR);
    await this.deleteContentUseCase.execute(args.id, args.version);
    return true;
  };
}
