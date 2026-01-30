import { hash, compare } from 'bcryptjs';

const SALT_ROUNDS = 12;

export const hashPassword = async (password: string): Promise<string> => {
  return hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password: string, passwordHash: string): Promise<boolean> => {
  return compare(password, passwordHash);
};
