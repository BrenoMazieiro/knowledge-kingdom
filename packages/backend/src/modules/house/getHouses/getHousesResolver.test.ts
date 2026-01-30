import { describe, it, expect, vi } from 'vitest';
import { GetHousesResolver } from './getHousesResolver';
import type { GraphQLContext } from '../../../context';
import type { IGetHousesUseCase } from '../types';
import type { HouseEntity } from '../repository/types';

describe('GetHousesResolver', () => {
  const setup = () => {
    const getHousesUseCase: IGetHousesUseCase = {
      execute: vi.fn(),
    };
    const resolver = new GetHousesResolver(getHousesUseCase);
    const context = {
      userId: 'u1',
      bmId: null,
      bmPermissionLevel: null,
      isBlocked: false,
      req: {},
      res: {},
    } as unknown as GraphQLContext;

    return { resolver, getHousesUseCase, context };
  };

  const houseEntities: HouseEntity[] = [
    {
      id: 'h1',
      version: 1,
      villageId: 'v1',
      creatorId: 'u1',
      name: 'Sword Hall',
      description: 'A place for warriors',
      iconUrl: 'https://example.com/icon1.png',
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
    },
    {
      id: 'h2',
      version: 1,
      villageId: 'v1',
      creatorId: 'u1',
      name: 'Magic Tower',
      description: null,
      iconUrl: null,
      isFree: false,
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
      sortOrder: 1,
      createdAt: new Date('2025-01-16'),
      updatedAt: null,
      deletedAt: null,
    },
  ];

  it('should return an array of house dtos for a village', async () => {
    const { resolver, getHousesUseCase, context } = setup();

    getHousesUseCase.execute = vi.fn().mockImplementation(async () => houseEntities);

    const result = await resolver.resolve({}, { villageId: 'v1' }, context);

    expect(getHousesUseCase.execute).toHaveBeenCalledWith('v1');
    expect(result).toEqual([
      {
        id: 'h1',
        version: 1,
        villageId: 'v1',
        creatorId: 'u1',
        ownerType: 'PLAYER',
        name: 'Sword Hall',
        description: 'A place for warriors',
        iconUrl: 'https://example.com/icon1.png',
        isFree: true,
        entryPrice: 100,
        visibility: 'PUBLIC',
        status: 'ACTIVE',
        sortOrder: 0,
        createdAt: new Date('2025-01-15'),
      },
      {
        id: 'h2',
        version: 1,
        villageId: 'v1',
        creatorId: 'u1',
        ownerType: 'PLAYER',
        name: 'Magic Tower',
        description: null,
        iconUrl: null,
        isFree: false,
        entryPrice: 100,
        visibility: 'PUBLIC',
        status: 'ACTIVE',
        sortOrder: 1,
        createdAt: new Date('2025-01-16'),
      },
    ]);
  });

  it('should propagate errors from getHousesUseCase', async () => {
    const { resolver, getHousesUseCase, context } = setup();
    const error = new Error('Village not found');

    getHousesUseCase.execute = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(resolver.resolve({}, { villageId: 'v1' }, context)).rejects.toThrow(error);
  });
});
