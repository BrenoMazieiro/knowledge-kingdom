import { BMPermissionLevel } from '@kk/shared/constants/enums';
import type { GraphQLContext } from '../../../context';
import type { BMEntity } from '../repository/types';
import type { IGetBMsUseCase, BMDTO } from '../types';
import { requireBMPermission } from '../../../infra/auth/guards';

export class GetBMsResolver {
  constructor(private readonly getBMsUseCase: IGetBMsUseCase) {}

  resolve = async (
    _parent: unknown,
    _args: unknown,
    context: GraphQLContext,
  ): Promise<BMDTO[]> => {
    requireBMPermission(context, BMPermissionLevel.VIEWER);
    const bms = await this.getBMsUseCase.execute();
    return bms.map((bm) => this.mapToDto(bm));
  };

  private mapToDto(entity: BMEntity): BMDTO {
    return {
      id: entity.id,
      email: entity.email,
      name: entity.name,
      permissionLevel: entity.permissionLevel,
      twoFactorEnabled: entity.twoFactorEnabled,
      createdAt: entity.createdAt,
    };
  }
}
