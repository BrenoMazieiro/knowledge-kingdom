import type { ISessionRepository } from '../repository/types';
import type { IAuthProvider } from '../authProviderTypes';
import type { ISignInUseCase } from '../types';

export class SignInUseCase implements ISignInUseCase {
  constructor(
    private readonly authProvider: IAuthProvider,
    private readonly sessionRepository: ISessionRepository,
  ) {}

  execute = async (email: string, password: string) => {
    const authenticatedUser = await this.authProvider.verifyCredentials({ email, password });

    const sessionId = await this.sessionRepository.create({
      userId: authenticatedUser.id,
    });

    return { userId: authenticatedUser.id, sessionId };
  };
}
