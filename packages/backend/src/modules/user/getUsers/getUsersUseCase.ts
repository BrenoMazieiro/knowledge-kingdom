import type { IUserRepository, UserEntity } from '../repository/types';

export interface IGetUsersUseCase {
  execute: () => Promise<UserEntity[]>;
}

export class GetUsersUseCase implements IGetUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute = async (): Promise<UserEntity[]> => {
    return this.userRepository.findAll(false);
  };
}
