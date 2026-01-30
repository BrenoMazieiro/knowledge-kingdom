import { randomUUID } from 'node:crypto';
import type { IUserRepository } from '../../user/repository/types';
import type { ISessionRepository } from '../repository/types';
import type { IWalletRepository } from '../../wallet/repository/types';
import { hashPassword } from '../password';
import type { ISignUpUseCase } from '../types';

export class SignUpUseCase implements ISignUpUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly sessionRepository: ISessionRepository,
    private readonly walletRepository: IWalletRepository,
  ) {}

  execute = async (name: string, gameName: string, email: string, password: string) => {
    const passwordHash = await hashPassword(password);
    const verifyToken = randomUUID();
    const verifyTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const user = await this.userRepository.create({
      name,
      gameName,
      email,
      passwordHash,
      verifyToken,
      verifyTokenExpiresAt,
    });

    await this.walletRepository.create(user.id);

    const sessionId = await this.sessionRepository.create({
      userId: user.id,
    });

    return { userId: user.id, sessionId };
  };
}
