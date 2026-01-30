import { db } from '../../infra/database/client';
import { villageRepository } from './repository/villageRepositoryModule';
import { CreateVillageUseCase } from './createVillage/createVillageUseCase';
import { GetVillageUseCase } from './getVillage/getVillageUseCase';
import { GetVillagesUseCase } from './getVillages/getVillagesUseCase';
import { UpdateVillageUseCase } from './updateVillage/updateVillageUseCase';
import { DeleteVillageUseCase } from './deleteVillage/deleteVillageUseCase';
import { CreateVillageResolver } from './createVillage/createVillageResolver';
import { GetVillageResolver } from './getVillage/getVillageResolver';
import { GetVillagesResolver } from './getVillages/getVillagesResolver';
import { UpdateVillageResolver } from './updateVillage/updateVillageResolver';
import { DeleteVillageResolver } from './deleteVillage/deleteVillageResolver';
import { VillageOverviewQuery } from './projections/villageOverviewQuery';
import { VillageOverviewResolver } from './projections/villageOverviewResolver';

const createVillageUseCase = new CreateVillageUseCase(villageRepository);
const getVillageUseCase = new GetVillageUseCase(villageRepository);
const getVillagesUseCase = new GetVillagesUseCase(villageRepository);
const updateVillageUseCase = new UpdateVillageUseCase(villageRepository);
const deleteVillageUseCase = new DeleteVillageUseCase(villageRepository);

export const createVillageResolver = new CreateVillageResolver(createVillageUseCase);
export const getVillageResolver = new GetVillageResolver(getVillageUseCase);
export const getVillagesResolver = new GetVillagesResolver(getVillagesUseCase);
export const updateVillageResolver = new UpdateVillageResolver(updateVillageUseCase);
export const deleteVillageResolver = new DeleteVillageResolver(deleteVillageUseCase);

const villageOverviewQuery = new VillageOverviewQuery(db);
export const villageOverviewResolver = new VillageOverviewResolver(villageOverviewQuery);
