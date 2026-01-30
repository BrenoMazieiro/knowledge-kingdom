import { describe, it, expect, vi } from 'vitest';
import { GetHouseResolver } from './getHouseResolver';
import type { GraphQLContext } from '../../../context';
import type { IGetHouseUseCase } from '../types';
import type { HouseEntity } from '../repository/types';

describe('GetHouseResolver', () => {
  const setup = () => {
    const getHouseUseCase: IGetHouseUseCase = {
      execute: vi.fn(),
    };
    const resolver = new GetHouseResolver(getHouseUseCase);
    const context = {
      userId: 'u1',
      bmId: null,
      bmPermissionLevel: null,
      isBlocked: false,
      req: {},
      res: {},
    } as unknown as GraphQLContext;

    return { resolver, getHouseUseCase, context };
  };

  const houseEntity: HouseEntity = {
    id: 'h1',
    version: 1,
    villageId: 'v1',
    creatorId: 'u1',
    name: 'Sword Hall',
    description: 'A place for warriors',
    iconUrl: 'https://example.com/icon.png',
    isFree: true,
    entryPrice: 100,
    ownerType: 'PLAYER',
    managerId: null,
    testQuestionCount: 5,
    testEasyCount: 2,
    testMediumCount: 1,
    testHardCount: 2,
    visibility: 'PUBLIC',
    status: 'ACTIVE',
    blockReason: null,
    sortOrder: 0,
    createdAt: new Date('2025-01-15'),
    updatedAt: null,
    deletedAt: null,
  };

  it('should return the house dto by id', async () => {
    const { resolver, getHouseUseCase, context } = setup();

    getHouseUseCase.execute = vi.fn().mockImplementation(async () => houseEntity);

    const result = await resolver.resolve({}, { id: 'h1' }, context);

    expect(getHouseUseCase.execute).toHaveBeenCalledWith('h1');
    expect(result).toEqual({
      id: 'h1',
      version: 1,
      villageId: 'v1',
      creatorId: 'u1',
      ownerType: 'PLAYER',
      name: 'Sword Hall',
      description: 'A place for warriors',
      iconUrl: 'https://example.com/icon.png',
      isFree: true,
      entryPrice: 100,
      visibility: 'PUBLIC',
      status: 'ACTIVE',
      sortOrder: 0,
      createdAt: new Date('2025-01-15'),
    });
  });

  it('should propagate errors from getHouseUseCase', async () => {
    const { resolver, getHouseUseCase, context } = setup();
    const error = new Error('House not found');

    getHouseUseCase.execute = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(resolver.resolve({}, { id: 'h1' }, context)).rejects.toThrow(error);
  });
});
