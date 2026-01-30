import type { GraphQLContext } from '../../../context';
import type { IGetContentsUseCase } from './getContentsUseCase';
import type { ContentDTO } from '../types';
import type { ContentEntity } from '../repository/types';

export class GetContentsResolver {
  constructor(private readonly getContentsUseCase: IGetContentsUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { houseId: string },
    _context: GraphQLContext,
  ): Promise<ContentDTO[]> => {
    const contents = await this.getContentsUseCase.execute(args.houseId);
    return contents.map((entity) => this.mapToDto(entity));
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
