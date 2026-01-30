import type { GraphQLContext } from '../../../context';
import type { IBMSignOutUseCase } from '../types';
import { requireBMAuth } from '../../../infra/auth/guards';

export class BMSignOutResolver {
  constructor(private readonly bmSignOutUseCase: IBMSignOutUseCase) {}

  resolve = async (
    _parent: unknown,
    _args: unknown,
    context: GraphQLContext,
  ): Promise<boolean> => {
    requireBMAuth(context);
    const sessionId = context.req.cookies?.bm_session_id;
    if (sessionId) {
      await this.bmSignOutUseCase.execute(sessionId);
      context.res.clearCookie('bm_session_id');
    }
    return true;
  };
}
