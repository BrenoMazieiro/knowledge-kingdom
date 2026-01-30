import { updateContentInputSchema } from '@kk/shared/schemas/content';
import type { GraphQLContext } from '../../../context';
import type { IUpdateContentUseCase } from './updateContentUseCase';
import type { ContentDTO } from '../types';
import type { ContentEntity } from '../repository/types';
import { requireBMPermission } from '../../../infra/auth/guards';
import { BMPermissionLevel } from '@kk/shared/constants/enums';

export class UpdateContentResolver {
  constructor(private readonly updateContentUseCase: IUpdateContentUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { input: unknown },
    context: GraphQLContext,
  ): Promise<ContentDTO> => {
    requireBMPermission(context, BMPermissionLevel.EDITOR);
    const input = updateContentInputSchema.parse(args.input);
    const { id, version, ...updateData } = input;
    const content = await this.updateContentUseCase.execute(id, version, updateData);
    return this.mapToDto(content);
  };

  private mapToDto(entity: ContentEntity): ContentDTO {
    return {
      id: entity.id,
      version: entity.version,
      houseId: entity.houseId,
      creatorId: entity.creatorId,
      title: entity.title,
      type: entity.type,
      url: entity.url,
      body: entity.body,
      description: entity.description,
      sortOrder: entity.sortOrder,
      createdAt: entity.createdAt,
    };
  }
}
