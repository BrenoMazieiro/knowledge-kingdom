import { createContentInputSchema } from '@kk/shared/schemas/content';
import type { GraphQLContext } from '../../../context';
import type { ICreateContentUseCase } from './createContentUseCase';
import type { ContentDTO } from '../types';
import type { ContentEntity } from '../repository/types';
import { requireBMPermission, requirePlayerNotBlocked } from '../../../infra/auth/guards';
import { BMPermissionLevel } from '@kk/shared/constants/enums';

export class CreateContentResolver {
  constructor(private readonly createContentUseCase: ICreateContentUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { input: unknown },
    context: GraphQLContext,
  ): Promise<ContentDTO> => {
    const userId = context.bmId
      ? requireBMPermission(context, BMPermissionLevel.EDITOR)
      : requirePlayerNotBlocked(context);

    const input = createContentInputSchema.parse(args.input);
    const content = await this.createContentUseCase.execute(
      input.houseId,
      userId,
      input.title,
      input.type,
      input.url ?? null,
      input.body ?? null,
      input.description || null,
    );
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
