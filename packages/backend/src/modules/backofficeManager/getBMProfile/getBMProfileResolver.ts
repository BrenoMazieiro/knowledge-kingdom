import type { GraphQLContext } from '../../../context';
import type { BMEntity } from '../repository/types';
import type { IGetBMProfileUseCase, BMDTO } from '../types';

export class GetBMProfileResolver {
  constructor(private readonly getBMProfileUseCase: IGetBMProfileUseCase) {}

  resolve = async (
    _parent: unknown,
    _args: unknown,
    context: GraphQLContext,
  ): Promise<BMDTO | null> => {
    if (!context.bmId) {
      return null;
    }

    const bm = await this.getBMProfileUseCase.execute(context.bmId);
    return this.mapToDTO(bm);
  };

  private mapToDTO(bm: BMEntity): BMDTO {
    return {
      id: bm.id,
      email: bm.email,
      name: bm.name,
      permissionLevel: bm.permissionLevel,
      twoFactorEnabled: bm.twoFactorEnabled,
      createdAt: bm.createdAt,
    };
  }
}
