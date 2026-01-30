import { BMPermissionLevel } from '@kk/shared/constants/enums';
import type { GraphQLContext } from '../../../context';
import type { IDeleteQuestionUseCase } from '../types';
import { requireBMPermission } from '../../../infra/auth/guards';

export class DeleteQuestionResolver {
  constructor(private readonly deleteQuestionUseCase: IDeleteQuestionUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { id: string; version: number },
    context: GraphQLContext,
  ): Promise<boolean> => {
    requireBMPermission(context, BMPermissionLevel.EDITOR);
    await this.deleteQuestionUseCase.execute(args.id, args.version);
    return true;
  };
}
