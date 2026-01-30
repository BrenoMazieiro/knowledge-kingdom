import type { IUserRepository } from '../../user/repository/types';
import type { IValidateEmailUseCase } from '../types';
import { ValidationError } from '../../../infra/errors/validationError';

export class ValidateEmailUseCase implements IValidateEmailUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute = async (token: string): Promise<void> => {
    const user = await this.userRepository.findOneByVerifyToken(token);

    if (user.verifyTokenExpiresAt && user.verifyTokenExpiresAt < new Date()) {
      throw new ValidationError([{ path: 'token', message: 'Verification token has expired' }]);
    }

    await this.userRepository.update(user.id, user.version, {
      emailVerified: true,
      verifyToken: null,
      verifyTokenExpiresAt: null,
    });
  };
}
