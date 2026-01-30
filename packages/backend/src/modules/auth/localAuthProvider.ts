import type { IUserRepository, UserEntity } from '../user/repository/types';
import type { AuthCredentials, AuthenticatedUser, IAuthProvider } from './authProviderTypes';
import { comparePassword } from './password';
import { UnauthorizedError } from '../../infra/errors/unauthorizedError';
import { EntityNotFoundError } from '../../infra/errors/entityNotFoundError';

// Pre-computed bcrypt hash used when user is not found, so the response time
// is indistinguishable from a real password comparison (prevents user enumeration).
const DUMMY_HASH = '$2a$12$LJ3m4ys3Lk0Tf6.flag/1.VYjPAsOQIrwJZPF9uf0bOY4xJRZ1Bm';

export class LocalAuthProvider implements IAuthProvider {
  constructor(private readonly userRepository: IUserRepository) {}

  verifyCredentials = async (credentials: AuthCredentials): Promise<AuthenticatedUser> => {
    let user: UserEntity | null = null;
    try {
      user = await this.userRepository.findOneByEmail(credentials.email);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        await comparePassword(credentials.password, DUMMY_HASH);
        throw new UnauthorizedError('Invalid credentials');
      }
      throw error;
    }

    const isValid = await comparePassword(credentials.password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedError('Invalid credentials');
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  };
}
