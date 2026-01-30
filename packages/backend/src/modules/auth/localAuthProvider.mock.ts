import { vi } from 'vitest';
import type { IAuthProvider } from './authProviderTypes';

export const createAuthProviderMock = (): IAuthProvider => ({
  verifyCredentials: vi.fn(),
});
