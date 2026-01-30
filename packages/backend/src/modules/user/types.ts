import type { UserEntity } from './repository/types';

export type UserDTO = {
  id: string;
  email: string;
  name: string;
  gameName: string;
  emailVerified: boolean;
  createdAt: Date;
};

export interface IGetUsersUseCase {
  execute: () => Promise<UserEntity[]>;
}
