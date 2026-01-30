import type { IBMSessionRepository } from '../repository/types';
import type { IBMSignOutUseCase } from '../types';

export class BMSignOutUseCase implements IBMSignOutUseCase {
  constructor(private readonly bmSessionRepository: IBMSessionRepository) {}

  execute = async (sessionId: string): Promise<void> => {
    await this.bmSessionRepository.destroy(sessionId);
  };
}
