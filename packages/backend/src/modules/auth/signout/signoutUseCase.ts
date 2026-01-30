import type { ISessionRepository } from '../repository/types';
import type { ISignOutUseCase } from '../types';

export class SignOutUseCase implements ISignOutUseCase {
  constructor(private readonly sessionRepository: ISessionRepository) {}

  execute = async (sessionId: string): Promise<void> => {
    await this.sessionRepository.destroy(sessionId);
  };
}
