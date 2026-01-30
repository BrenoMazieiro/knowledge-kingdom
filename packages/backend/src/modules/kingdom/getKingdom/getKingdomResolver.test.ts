import { describe, it, expect, vi } from 'vitest';
import { GetKingdomResolver } from './getKingdomResolver';
import type { IGetKingdomUseCase } from './getKingdomUseCase';
import type { GraphQLContext } from '../../../context';

describe('GetKingdomResolver', () => {
  const mockContext: GraphQLContext = {
    userId: 'u1',
    bmId: null,
    bmPermissionLevel: null,
    isBlocked: false,
    req: {} as GraphQLContext['req'],
    res: {} as GraphQLContext['res'],
    session: null,
    loaders: {} as GraphQLContext['loaders'],
  };

  const setup = () => {
    const getKingdomUseCase: IGetKingdomUseCase = {
      execute: vi.fn(),
    };
    const resolver = new GetKingdomResolver(getKingdomUseCase);
    return { resolver, getKingdomUseCase };
  };

  it('should call use case with id and return mapped DTO', async () => {
    const { resolver, getKingdomUseCase } = setup();

    const entity = {
      id: 'kingdom-1',
      version: 2,
      name: 'Science',
      description: 'The science kingdom',
      iconUrl: 'https://example.com/icon.png',
      sortOrder: 3,
      creatorId: null,
      kingQueenId: null,
      visibility: 'PUBLIC',
      status: 'ACTIVE',
      blockReason: null,
      treasuryBalance: 0,
      createdAt: new Date('2025-01-15'),
      updatedAt: new Date('2025-01-16'),
      deletedAt: null,
    };

    getKingdomUseCase.execute = vi.fn().mockImplementation(async () => entity);

    const result = await resolver.resolve({}, { id: 'kingdom-1' }, mockContext);

    expect(getKingdomUseCase.execute).toHaveBeenCalledWith('kingdom-1');
    expect(result).toEqual({
      id: 'kingdom-1',
      version: 2,
      name: 'Science',
      description: 'The science kingdom',
      iconUrl: 'https://example.com/icon.png',
      sortOrder: 3,
      creatorId: null,
      kingQueenId: null,
      visibility: 'PUBLIC',
      status: 'ACTIVE',
      treasuryBalance: 0,
      createdAt: new Date('2025-01-15'),
    });
  });

  it('should propagate errors from use case', async () => {
    const { resolver, getKingdomUseCase } = setup();
    const error = new Error('not found');

    getKingdomUseCase.execute = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(resolver.resolve({}, { id: 'kingdom-1' }, mockContext)).rejects.toThrow(error);
  });
});
