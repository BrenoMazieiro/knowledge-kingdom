import type { GraphQLContext } from '../../../context';
import type { UserEntity } from '../../user/repository/types';
import type { IGetMeUseCase, UserDTO } from '../types';

export class MeResolver {
  constructor(private readonly getMeUseCase: IGetMeUseCase) {}

  resolve = async (
    _parent: unknown,
    _args: unknown,
    context: GraphQLContext,
  ): Promise<UserDTO | null> => {
    if (!context.userId) {
      return null;
    }

    const user = await this.getMeUseCase.execute(context.userId);
    return this.mapToDto(user);
  };

  private mapToDto(user: UserEntity): UserDTO {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      gameName: user.gameName,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
    };
  }
}
