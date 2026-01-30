import type { IUserRepository } from '../../user/repository/types';
import type { IExportMyDataUseCase, UserDataExport } from '../types';

export class ExportMyDataUseCase implements IExportMyDataUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
  ) {}

  execute = async (userId: string): Promise<UserDataExport> => {
    const user = await this.userRepository.findOneById(userId);

    return {
      profile: {
        id: user.id,
        email: user.email,
        name: user.name,
        gameName: user.gameName,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
      },
      exportedAt: new Date(),
    };
  };
}
