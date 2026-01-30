import { describe, it, expect, vi } from 'vitest';
import { CreateHouseResolver } from './createHouseResolver';
import type { GraphQLContext } from '../../../context';
import type { ICreateHouseUseCase } from '../types';
import type { HouseEntity } from '../repository/types';

const VILLAGE_ID = '00000000-0000-0000-0000-000000000001';
const USER_ID = '00000000-0000-0000-0000-000000000010';
const BM_ID = 'bm-1';

describe('CreateHouseResolver', () => {
  const setupPlayerContext = () => {
    const createHouseUseCase: ICreateHouseUseCase = {
      execute: vi.fn(),
    };
    const resolver = new CreateHouseResolver(createHouseUseCase);
    const context = {
      userId: USER_ID,
      bmId: null,
      bmPermissionLevel: null,
      isBlocked: false,
      req: {},
      res: {},
      session: null,
      loaders: {},
    } as unknown as GraphQLContext;

    return { resolver, createHouseUseCase, context };
  };

  const setupBMContext = () => {
    const createHouseUseCase: ICreateHouseUseCase = {
      execute: vi.fn(),
    };
    const resolver = new CreateHouseResolver(createHouseUseCase);
    const context = {
      userId: null,
      bmId: BM_ID,
      bmPermissionLevel: 'ADMIN',
      isBlocked: false,
      req: {},
      res: {},
      session: null,
      loaders: {},
    } as unknown as GraphQLContext;

    return { resolver, createHouseUseCase, context };
  };

  const houseEntity: HouseEntity = {
    id: 'h1',
    version: 1,
    villageId: VILLAGE_ID,
    creatorId: USER_ID,
    name: 'Sword Hall',
    description: 'A place for warriors',
    iconUrl: 'https://example.com/icon.png',
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
    createdAt: new Date('2025-01-15'),
    updatedAt: null,
    deletedAt: null,
  };

  it('should create a house as a player and return the dto', async () => {
    const { resolver, createHouseUseCase, context } = setupPlayerContext();

    createHouseUseCase.execute = vi.fn().mockImplementation(async () => houseEntity);

    const result = await resolver.resolve(
      {},
      {
        input: {
          villageId: VILLAGE_ID,
          name: 'Sword Hall',
          description: 'A place for warriors',
          iconUrl: 'https://example.com/icon.png',
          isFree: false,
          entryPrice: 100,
        },
      },
      context,
    );

    expect(createHouseUseCase.execute).toHaveBeenCalledWith(
      VILLAGE_ID,
      USER_ID,
      'Sword Hall',
      'A place for warriors',
      'https://example.com/icon.png',
      false,
      100,
      'PUBLIC',
    );
    expect(result).toEqual({
      id: 'h1',
      version: 1,
      villageId: VILLAGE_ID,
      creatorId: USER_ID,
      ownerType: 'PLAYER',
      name: 'Sword Hall',
      description: 'A place for warriors',
      iconUrl: 'https://example.com/icon.png',
      isFree: false,
      entryPrice: 100,
      visibility: 'PUBLIC',
      status: 'ACTIVE',
      sortOrder: 1,
      createdAt: new Date('2025-01-15'),
    });
  });

  it('should create a house as a BM and return the dto', async () => {
    const { resolver, createHouseUseCase, context } = setupBMContext();

    createHouseUseCase.execute = vi.fn().mockImplementation(async () => houseEntity);

    const result = await resolver.resolve(
      {},
      {
        input: {
          villageId: VILLAGE_ID,
          name: 'Sword Hall',
          description: 'A place for warriors',
          iconUrl: 'https://example.com/icon.png',
          isFree: false,
          entryPrice: 100,
        },
      },
      context,
    );

    expect(createHouseUseCase.execute).toHaveBeenCalledWith(
      VILLAGE_ID,
      BM_ID,
      'Sword Hall',
      'A place for warriors',
      'https://example.com/icon.png',
      false,
      100,
      'PUBLIC',
    );
    expect(result).toEqual({
      id: 'h1',
      version: 1,
      villageId: VILLAGE_ID,
      creatorId: USER_ID,
      ownerType: 'PLAYER',
      name: 'Sword Hall',
      description: 'A place for warriors',
      iconUrl: 'https://example.com/icon.png',
      isFree: false,
      entryPrice: 100,
      visibility: 'PUBLIC',
      status: 'ACTIVE',
      sortOrder: 1,
      createdAt: new Date('2025-01-15'),
    });
  });

  it('should reject blocked players', async () => {
    const { resolver } = setupPlayerContext();
    const blockedContext = {
      userId: USER_ID,
      bmId: null,
      bmPermissionLevel: null,
      isBlocked: true,
      req: {},
      res: {},
      session: null,
      loaders: {},
    } as unknown as GraphQLContext;

    await expect(
      resolver.resolve(
        {},
        {
          input: {
            villageId: VILLAGE_ID,
            name: 'Sword Hall',
            description: 'A place for warriors',
            iconUrl: 'https://example.com/icon.png',
            isFree: false,
            entryPrice: 100,
          },
        },
        blockedContext,
      ),
    ).rejects.toThrow();
  });

  it('should propagate errors from createHouseUseCase', async () => {
    const { resolver, createHouseUseCase, context } = setupPlayerContext();
    const error = new Error('House creation failed');

    createHouseUseCase.execute = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(
      resolver.resolve(
        {},
        {
          input: {
            villageId: VILLAGE_ID,
            name: 'Sword Hall',
            description: 'A place for warriors',
            iconUrl: 'https://example.com/icon.png',
            isFree: false,
            entryPrice: 100,
          },
        },
        context,
      ),
    ).rejects.toThrow(error);
  });
});
