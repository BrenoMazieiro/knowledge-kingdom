import type { IUserRepository } from '../../user/repository/types';
import type { ISessionRepository } from '../repository/types';
import type { IDeleteMyAccountUseCase } from '../types';

export class DeleteMyAccountUseCase implements IDeleteMyAccountUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly sessionRepository: ISessionRepository,
  ) {}

  execute = async (userId: string): Promise<void> => {
    await this.sessionRepository.destroyByUserId(userId);
    await this.userRepository.hardDelete(userId);
  };
}
