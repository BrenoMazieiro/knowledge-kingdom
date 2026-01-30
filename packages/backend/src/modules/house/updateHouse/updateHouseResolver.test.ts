import { describe, it, expect, vi } from 'vitest';
import { UpdateHouseResolver } from './updateHouseResolver';
import type { GraphQLContext } from '../../../context';
import type { IUpdateHouseUseCase } from './updateHouseUseCase';
import type { HouseEntity } from '../repository/types';

const HOUSE_ID = '00000000-0000-0000-0000-000000000001';
const VILLAGE_ID = '00000000-0000-0000-0000-000000000002';
const USER_ID = '00000000-0000-0000-0000-000000000010';

describe('UpdateHouseResolver', () => {
  const setup = () => {
    const updateHouseUseCase: IUpdateHouseUseCase = {
      execute: vi.fn(),
    };
    const resolver = new UpdateHouseResolver(updateHouseUseCase);
    const context = {
      userId: null,
      bmId: 'bm-1',
      bmPermissionLevel: 'ADMIN',
      isBlocked: false,
      req: {},
      res: {},
      session: null,
      loaders: {},
    } as unknown as GraphQLContext;

    return { resolver, updateHouseUseCase, context };
  };

  const updatedEntity: HouseEntity = {
    id: HOUSE_ID,
    version: 2,
    villageId: VILLAGE_ID,
    creatorId: USER_ID,
    name: 'Updated Hall',
    description: 'Updated description',
    iconUrl: 'https://example.com/new-icon.png',
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
    updatedAt: new Date('2025-02-10'),
    deletedAt: null,
  };

  it('should update a house and return the dto', async () => {
    const { resolver, updateHouseUseCase, context } = setup();

    updateHouseUseCase.execute = vi.fn().mockImplementation(async () => updatedEntity);

    const result = await resolver.resolve(
      {},
      {
        input: {
          id: HOUSE_ID,
          version: 1,
          name: 'Updated Hall',
          description: 'Updated description',
          iconUrl: 'https://example.com/new-icon.png',
          isFree: false,
        },
      },
      context,
    );

    expect(updateHouseUseCase.execute).toHaveBeenCalledWith(HOUSE_ID, 1, {
      name: 'Updated Hall',
      description: 'Updated description',
      iconUrl: 'https://example.com/new-icon.png',
      isFree: false,
    });
    expect(result).toEqual({
      id: HOUSE_ID,
      version: 2,
      villageId: VILLAGE_ID,
      creatorId: USER_ID,
      ownerType: 'PLAYER',
      name: 'Updated Hall',
      description: 'Updated description',
      iconUrl: 'https://example.com/new-icon.png',
      isFree: false,
      entryPrice: 100,
      visibility: 'PUBLIC',
      status: 'ACTIVE',
      sortOrder: 1,
      createdAt: new Date('2025-01-15'),
    });
  });

  it('should reject non-BM users', async () => {
    const { resolver } = setup();
    const playerContext = {
      userId: USER_ID,
      bmId: null,
      bmPermissionLevel: null,
      isBlocked: false,
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
            id: HOUSE_ID,
            version: 1,
            name: 'Updated Hall',
          },
        },
        playerContext,
      ),
    ).rejects.toThrow();
  });

  it('should propagate errors from updateHouseUseCase', async () => {
    const { resolver, updateHouseUseCase, context } = setup();
    const error = new Error('Version mismatch');

    updateHouseUseCase.execute = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(
      resolver.resolve(
        {},
        {
          input: {
            id: HOUSE_ID,
            version: 1,
            name: 'Updated Hall',
          },
        },
        context,
      ),
    ).rejects.toThrow(error);
  });
});
