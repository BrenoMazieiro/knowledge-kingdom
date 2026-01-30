import type { IUserRepository, UserEntity } from '../../user/repository/types';
import type { IGetMeUseCase } from '../types';

export class GetMeUseCase implements IGetMeUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute = async (userId: string): Promise<UserEntity> => {
    return this.userRepository.findOneById(userId);
  };
}
