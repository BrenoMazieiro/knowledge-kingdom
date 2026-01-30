import type { GraphQLContext } from '../../../context';
import type { IDeleteMyAccountUseCase } from '../types';
import { UnauthorizedError } from '../../../infra/errors/unauthorizedError';
import { env } from '../../../infra/config/env';

export class DeleteMyAccountResolver {
  constructor(private readonly deleteMyAccountUseCase: IDeleteMyAccountUseCase) {}

  resolve = async (
    _parent: unknown,
    _args: unknown,
    context: GraphQLContext,
  ): Promise<boolean> => {
    if (!context.userId) {
      throw new UnauthorizedError();
    }

    await this.deleteMyAccountUseCase.execute(context.userId);
    context.res.clearCookie('session_id', {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return true;
  };
}
