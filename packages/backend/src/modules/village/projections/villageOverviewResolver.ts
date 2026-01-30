import type { GraphQLContext } from '../../../context';
import type { VillageOverviewQuery } from './villageOverviewQuery';
import type { VillageOverviewDTO } from '../types';

export class VillageOverviewResolver {
  constructor(private readonly query: VillageOverviewQuery) {}

  resolve = async (
    _parent: unknown,
    args: { villageId: string },
    context: GraphQLContext,
  ): Promise<VillageOverviewDTO> => {
    return this.query.execute(args.villageId, context.userId);
  };
}
