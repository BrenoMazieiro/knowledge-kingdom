import type { BaseEntity } from '../../../infra/database/types';

export type UserEntity = BaseEntity & {
  email: string;
  name: string;
  gameName: string;
  passwordHash: string;
  emailVerified: boolean;
  verifyToken: string | null;
  verifyTokenExpiresAt: Date | null;
  isBlocked: boolean;
  blockReason: string | null;
};

export type UserEntityCreate = {
  email: string;
  name: string;
  gameName: string;
  passwordHash: string;
  verifyToken: string | null;
  verifyTokenExpiresAt: Date | null;
};

export type UserEntityUpdate = {
  email?: string;
  name?: string;
  gameName?: string;
  passwordHash?: string;
  emailVerified?: boolean;
  verifyToken?: string | null;
  verifyTokenExpiresAt?: Date | null;
  isBlocked?: boolean;
  blockReason?: string | null;
};

export interface IUserRepository {
  findOneById: (id: string, withDeleted?: boolean) => Promise<UserEntity>;
  findManyByIds: (ids: readonly string[]) => Promise<UserEntity[]>;
  findOneByEmail: (email: string, withDeleted?: boolean) => Promise<UserEntity>;
  findOneByGameName: (gameName: string) => Promise<UserEntity>;
  findOneByVerifyToken: (token: string) => Promise<UserEntity>;
  findAll: (withDeleted?: boolean) => Promise<UserEntity[]>;
  create: (data: UserEntityCreate) => Promise<UserEntity>;
  update: (id: string, version: number, data: UserEntityUpdate) => Promise<UserEntity>;
  softDelete: (id: string, version: number) => Promise<void>;
  hardDelete: (id: string) => Promise<void>;
}
