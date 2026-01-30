import { validateEmailInputSchema } from '@kk/shared/schemas/auth';
import type { GraphQLContext } from '../../../context';
import type { IValidateEmailUseCase } from '../types';

export class ValidateEmailResolver {
  constructor(private readonly validateEmailUseCase: IValidateEmailUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { input: unknown },
    _context: GraphQLContext,
  ): Promise<boolean> => {
    const input = validateEmailInputSchema.parse(args.input);
    await this.validateEmailUseCase.execute(input.token);
    return true;
  };
}
