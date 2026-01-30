import { describe, it, expect, vi } from 'vitest';
import { ValidateEmailResolver } from './validateEmailResolver';
import type { GraphQLContext } from '../../../context';
import type { IValidateEmailUseCase } from '../types';

describe('ValidateEmailResolver', () => {
  const setup = () => {
    const validateEmailUseCase: IValidateEmailUseCase = {
      execute: vi.fn(),
    };
    const resolver = new ValidateEmailResolver(validateEmailUseCase);
    const context = {} as unknown as GraphQLContext;

    return { resolver, validateEmailUseCase, context };
  };

  it('should validate email and return true', async () => {
    const { resolver, validateEmailUseCase, context } = setup();
    const token = '550e8400-e29b-41d4-a716-446655440000';

    validateEmailUseCase.execute = vi.fn().mockImplementation(async () => undefined);

    const result = await resolver.resolve(
      {},
      { input: { token } },
      context,
    );

    expect(validateEmailUseCase.execute).toHaveBeenCalledWith(token);
    expect(result).toBe(true);
  });

  it('should propagate errors from validateEmailUseCase', async () => {
    const { resolver, validateEmailUseCase, context } = setup();
    const token = '550e8400-e29b-41d4-a716-446655440000';
    const error = new Error('Invalid token');

    validateEmailUseCase.execute = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(
      resolver.resolve({}, { input: { token } }, context),
    ).rejects.toThrow(error);
  });
});
