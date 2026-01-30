import type { IUserRepository } from '../../user/repository/types';
import type { ISessionRepository } from '../repository/types';
import type { IAuthProvider } from '../authProviderTypes';
import type { IChangePasswordUseCase } from '../types';
import { hashPassword } from '../password';

export class ChangePasswordUseCase implements IChangePasswordUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly sessionRepository: ISessionRepository,
    private readonly authProvider: IAuthProvider,
  ) {}

  execute = async (
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> => {
    const user = await this.userRepository.findOneById(userId);

    await this.authProvider.verifyCredentials({
      email: user.email,
      password: currentPassword,
    });

    const passwordHash = await hashPassword(newPassword);
    await this.userRepository.update(user.id, user.version, { passwordHash });

    await this.sessionRepository.destroyByUserId(userId);
  };
}
