import { changePasswordInputSchema } from '@kk/shared/schemas/auth';
import type { GraphQLContext } from '../../../context';
import type { IChangePasswordUseCase } from '../types';
import { UnauthorizedError } from '../../../infra/errors/unauthorizedError';
import { env } from '../../../infra/config/env';

export class ChangePasswordResolver {
  constructor(private readonly changePasswordUseCase: IChangePasswordUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { input: unknown },
    context: GraphQLContext,
  ): Promise<boolean> => {
    if (!context.userId) {
      throw new UnauthorizedError();
    }

    const input = changePasswordInputSchema.parse(args.input);
    await this.changePasswordUseCase.execute(
      context.userId,
      input.currentPassword,
      input.newPassword,
    );

    context.res.clearCookie('session_id', {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return true;
  };
}
