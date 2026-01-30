import { bmSignInInputSchema } from '@kk/shared/schemas/auth';
import type { GraphQLContext } from '../../../context';
import type { BMEntity } from '../repository/types';
import type { IBMSignInUseCase, IGetBMProfileUseCase, BMAuthPayloadDTO } from '../types';
import { env } from '../../../infra/config/env';

export class BMSignInResolver {
  constructor(
    private readonly bmSignInUseCase: IBMSignInUseCase,
    private readonly getBMProfileUseCase: IGetBMProfileUseCase,
  ) {}

  resolve = async (
    _parent: unknown,
    args: { input: unknown },
    context: GraphQLContext,
  ): Promise<BMAuthPayloadDTO> => {
    const input = bmSignInInputSchema.parse(args.input);
    const { bmId, sessionId } = await this.bmSignInUseCase.execute(input.email, input.password);

    context.res.cookie('bm_session_id', sessionId, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: env.SESSION_MAX_AGE_MS,
    });

    const bm = await this.getBMProfileUseCase.execute(bmId);
    return this.mapToPayload(bm);
  };

  private mapToPayload(bm: BMEntity): BMAuthPayloadDTO {
    return {
      manager: {
        id: bm.id,
        email: bm.email,
        name: bm.name,
        permissionLevel: bm.permissionLevel,
        twoFactorEnabled: bm.twoFactorEnabled,
        createdAt: bm.createdAt,
      },
    };
  }
}
