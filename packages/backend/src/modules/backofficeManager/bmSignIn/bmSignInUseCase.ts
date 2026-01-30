import { comparePassword } from '../../auth/password';
import { UnauthorizedError } from '../../../infra/errors/unauthorizedError';
import type { IBMRepository, IBMSessionRepository } from '../repository/types';
import type { IBMSignInUseCase } from '../types';

export class BMSignInUseCase implements IBMSignInUseCase {
  constructor(
    private readonly bmRepository: IBMRepository,
    private readonly bmSessionRepository: IBMSessionRepository,
  ) {}

  execute = async (email: string, password: string) => {
    const bm = await this.bmRepository.findOneByEmail(email);
    const valid = await comparePassword(password, bm.passwordHash);
    if (!valid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const sessionId = await this.bmSessionRepository.create({
      bmId: bm.id,
      permissionLevel: bm.permissionLevel,
    });

    return { bmId: bm.id, sessionId, permissionLevel: bm.permissionLevel };
  };
}
