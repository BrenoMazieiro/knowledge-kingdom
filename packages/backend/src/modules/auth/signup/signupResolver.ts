import { signUpInputSchema } from '@kk/shared/schemas/auth';
import type { GraphQLContext } from '../../../context';
import type { UserEntity } from '../../user/repository/types';
import type { ISignUpUseCase, IGetMeUseCase, AuthPayloadDTO } from '../types';
import { env } from '../../../infra/config/env';

export class SignUpResolver {
  constructor(
    private readonly signUpUseCase: ISignUpUseCase,
    private readonly getMeUseCase: IGetMeUseCase,
  ) {}

  resolve = async (
    _parent: unknown,
    args: { input: unknown },
    context: GraphQLContext,
  ): Promise<AuthPayloadDTO> => {
    const input = signUpInputSchema.parse(args.input);
    const { userId, sessionId } = await this.signUpUseCase.execute(
      input.name,
      input.gameName,
      input.email,
      input.password,
    );

    context.res.cookie('session_id', sessionId, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: env.SESSION_MAX_AGE_MS,
    });

    const user = await this.getMeUseCase.execute(userId);
    return this.mapToPayload(user);
  };

  private mapToPayload(user: UserEntity): AuthPayloadDTO {
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        gameName: user.gameName,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
      },
    };
  }
}
