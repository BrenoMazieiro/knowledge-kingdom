import type { GraphQLContext } from '../../../context';
import type { IGetQuestionPoolUseCase, QuestionPoolDTO } from '../types';
import { requireAuth, requireBMAuth } from '../../../infra/auth/guards';

export class GetQuestionPoolResolver {
  constructor(private readonly getQuestionPoolUseCase: IGetQuestionPoolUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { houseId: string },
    context: GraphQLContext,
  ): Promise<QuestionPoolDTO> => {
    if (context.bmId) {
      requireBMAuth(context);
    } else {
      requireAuth(context);
    }
    return this.getQuestionPoolUseCase.execute(args.houseId);
  };
}
