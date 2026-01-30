import type { GraphQLContext } from '../../../context';
import type { KingdomOverviewQuery } from './kingdomOverviewQuery';
import type { KingdomOverviewDTO } from '../types';

export class KingdomOverviewResolver {
  constructor(private readonly query: KingdomOverviewQuery) {}

  resolve = async (
    _parent: unknown,
    args: { kingdomId: string },
    _context: GraphQLContext,
  ): Promise<KingdomOverviewDTO> => {
    return this.query.execute(args.kingdomId);
  };
}
