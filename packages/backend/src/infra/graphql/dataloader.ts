import DataLoader from 'dataloader';
import type { IKingdomRepository } from '../../modules/kingdom/repository/types';
import type { IVillageRepository } from '../../modules/village/repository/types';
import type { IHouseRepository } from '../../modules/house/repository/types';
import type { IContentRepository } from '../../modules/content/repository/types';
import type { IUserRepository } from '../../modules/user/repository/types';
import type { IQuestionOptionRepository } from '../../modules/question/repository/types';
import type { KingdomEntity } from '../../modules/kingdom/repository/types';
import type { VillageEntity } from '../../modules/village/repository/types';
import type { HouseEntity } from '../../modules/house/repository/types';
import type { ContentEntity } from '../../modules/content/repository/types';
import type { UserEntity } from '../../modules/user/repository/types';
import type { QuestionOptionEntity } from '../../modules/question/repository/types';

export type DataLoaders = {
  kingdomById: DataLoader<string, KingdomEntity>;
  villageById: DataLoader<string, VillageEntity>;
  houseById: DataLoader<string, HouseEntity>;
  userById: DataLoader<string, UserEntity>;
  villagesByKingdomId: DataLoader<string, VillageEntity[]>;
  housesByVillageId: DataLoader<string, HouseEntity[]>;
  contentsByHouseId: DataLoader<string, ContentEntity[]>;
  questionOptionsByQuestionId: DataLoader<string, QuestionOptionEntity[]>;
};

type DataLoaderDeps = {
  kingdomRepository: IKingdomRepository;
  villageRepository: IVillageRepository;
  houseRepository: IHouseRepository;
  contentRepository: IContentRepository;
  userRepository: IUserRepository;
  questionOptionRepository: IQuestionOptionRepository;
};

const createByIdLoader = <TEntity extends { id: string }>(
  batchFn: (ids: readonly string[]) => Promise<TEntity[]>,
): DataLoader<string, TEntity> => {
  return new DataLoader<string, TEntity>(async (ids) => {
    const entities = await batchFn(ids);
    const entityMap = new Map(entities.map((e) => [e.id, e]));
    return ids.map((id) => entityMap.get(id) ?? new Error(`Entity ${id} not found`));
  });
};

const createByForeignKeyLoader = <TEntity extends Record<string, unknown>>(
  batchFn: (keys: readonly string[]) => Promise<TEntity[]>,
  foreignKey: keyof TEntity,
): DataLoader<string, TEntity[]> => {
  return new DataLoader<string, TEntity[]>(async (keys) => {
    const entities = await batchFn(keys);
    const grouped = new Map<string, TEntity[]>();
    for (const entity of entities) {
      const key = String(entity[foreignKey]);
      const list = grouped.get(key) ?? [];
      list.push(entity);
      grouped.set(key, list);
    }
    return keys.map((key) => grouped.get(key) ?? []);
  });
};

export const createDataLoaders = (deps: DataLoaderDeps): DataLoaders => ({
  kingdomById: createByIdLoader((ids) => deps.kingdomRepository.findManyByIds(ids)),
  villageById: createByIdLoader((ids) => deps.villageRepository.findManyByIds(ids)),
  houseById: createByIdLoader((ids) => deps.houseRepository.findManyByIds(ids)),
  userById: createByIdLoader((ids) => deps.userRepository.findManyByIds(ids)),
  villagesByKingdomId: createByForeignKeyLoader(
    (ids) => deps.villageRepository.findManyByKingdomIds(ids),
    'kingdomId',
  ),
  housesByVillageId: createByForeignKeyLoader(
    (ids) => deps.houseRepository.findManyByVillageIds(ids),
    'villageId',
  ),
  contentsByHouseId: createByForeignKeyLoader(
    (ids) => deps.contentRepository.findManyByHouseIds(ids),
    'houseId',
  ),
  questionOptionsByQuestionId: createByForeignKeyLoader(
    (ids) => deps.questionOptionRepository.findByQuestionIds(ids),
    'questionId',
  ),
});
