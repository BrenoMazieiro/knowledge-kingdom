import type { UserEntity } from '../user/repository/types';

export type UserDTO = {
  id: string;
  email: string;
  name: string;
  gameName: string;
  emailVerified: boolean;
  createdAt: Date;
};

export type AuthPayloadDTO = {
  user: UserDTO;
};

export interface ISignUpUseCase {
  execute: (name: string, gameName: string, email: string, password: string) => Promise<{ userId: string; sessionId: string }>;
}

export interface ISignInUseCase {
  execute: (email: string, password: string) => Promise<{ userId: string; sessionId: string }>;
}

export interface ISignOutUseCase {
  execute: (sessionId: string) => Promise<void>;
}

export interface IGetMeUseCase {
  execute: (userId: string) => Promise<UserEntity>;
}

export interface IValidateEmailUseCase {
  execute: (token: string) => Promise<void>;
}

export interface IDeleteMyAccountUseCase {
  execute: (userId: string) => Promise<void>;
}

export type UserDataExport = {
  profile: {
    id: string;
    email: string;
    name: string;
    gameName: string;
    emailVerified: boolean;
    createdAt: Date;
  };
  exportedAt: Date;
};

export interface IExportMyDataUseCase {
  execute: (userId: string) => Promise<UserDataExport>;
}

export interface IChangePasswordUseCase {
  execute: (userId: string, currentPassword: string, newPassword: string) => Promise<void>;
}
