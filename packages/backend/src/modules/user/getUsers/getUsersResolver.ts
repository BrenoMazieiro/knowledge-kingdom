import type { GraphQLContext } from '../../../context';
import type { IGetUsersUseCase } from './getUsersUseCase';
import type { UserDTO } from '../types';
import type { UserEntity } from '../repository/types';
import { requireBMPermission } from '../../../infra/auth/guards';
import { BMPermissionLevel } from '@kk/shared/constants/enums';

export class GetUsersResolver {
  constructor(private readonly getUsersUseCase: IGetUsersUseCase) {}

  resolve = async (
    _parent: unknown,
    _args: unknown,
    context: GraphQLContext,
  ): Promise<UserDTO[]> => {
    requireBMPermission(context, BMPermissionLevel.VIEWER);
    const users = await this.getUsersUseCase.execute();
    return users.map((entity) => this.mapToDto(entity));
  };

  private mapToDto(entity: UserEntity): UserDTO {
    return {
      id: entity.id,
      email: entity.email,
      name: entity.name,
      gameName: entity.gameName,
      emailVerified: entity.emailVerified,
      createdAt: entity.createdAt,
    };
  }
}
