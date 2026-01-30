import type { GraphQLContext } from '../../../context';
import type { IExportMyDataUseCase, UserDataExport } from '../types';
import { UnauthorizedError } from '../../../infra/errors/unauthorizedError';

export class ExportMyDataResolver {
  constructor(private readonly exportMyDataUseCase: IExportMyDataUseCase) {}

  resolve = async (
    _parent: unknown,
    _args: unknown,
    context: GraphQLContext,
  ): Promise<UserDataExport> => {
    if (!context.userId) {
      throw new UnauthorizedError();
    }

    return this.exportMyDataUseCase.execute(context.userId);
  };
}
