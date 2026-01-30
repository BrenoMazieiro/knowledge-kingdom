import type { GraphQLContext } from '../../../context';
import type { IGetContentUseCase } from './getContentUseCase';
import type { ContentDTO } from '../types';
import type { ContentEntity } from '../repository/types';

export class GetContentResolver {
  constructor(private readonly getContentUseCase: IGetContentUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { id: string },
    _context: GraphQLContext,
  ): Promise<ContentDTO> => {
    const content = await this.getContentUseCase.execute(args.id);
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
