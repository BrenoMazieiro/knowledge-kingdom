import type { GraphQLContext } from '../../../context';
import type { ISignOutUseCase } from '../types';
import { UnauthorizedError } from '../../../infra/errors/unauthorizedError';
import { env } from '../../../infra/config/env';

export class SignOutResolver {
  constructor(private readonly signOutUseCase: ISignOutUseCase) {}

  resolve = async (
    _parent: unknown,
    _args: unknown,
    context: GraphQLContext,
  ): Promise<boolean> => {
    const sessionId = context.req.cookies?.session_id ?? null;
    if (!sessionId) {
      throw new UnauthorizedError();
    }

    await this.signOutUseCase.execute(sessionId);
    context.res.clearCookie('session_id', {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return true;
  };
}
