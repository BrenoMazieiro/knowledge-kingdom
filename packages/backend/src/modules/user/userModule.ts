import { userRepository } from './repository/userRepositoryModule';
import { GetUsersUseCase } from './getUsers/getUsersUseCase';
import { GetUsersResolver } from './getUsers/getUsersResolver';

const getUsersUseCase = new GetUsersUseCase(userRepository);

export const getUsersResolver = new GetUsersResolver(getUsersUseCase);
