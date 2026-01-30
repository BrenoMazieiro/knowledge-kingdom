import { db } from '../../infra/database/client';
import { kingdomRepository } from './repository/kingdomRepositoryModule';
import { CreateKingdomUseCase } from './createKingdom/createKingdomUseCase';
import { GetKingdomUseCase } from './getKingdom/getKingdomUseCase';
import { GetKingdomsUseCase } from './getKingdoms/getKingdomsUseCase';
import { UpdateKingdomUseCase } from './updateKingdom/updateKingdomUseCase';
import { DeleteKingdomUseCase } from './deleteKingdom/deleteKingdomUseCase';
import { CreateKingdomResolver } from './createKingdom/createKingdomResolver';
import { GetKingdomResolver } from './getKingdom/getKingdomResolver';
import { GetKingdomsResolver } from './getKingdoms/getKingdomsResolver';
import { UpdateKingdomResolver } from './updateKingdom/updateKingdomResolver';
import { DeleteKingdomResolver } from './deleteKingdom/deleteKingdomResolver';
import { KingdomOverviewQuery } from './projections/kingdomOverviewQuery';
import { KingdomOverviewResolver } from './projections/kingdomOverviewResolver';

const createKingdomUseCase = new CreateKingdomUseCase(kingdomRepository);
const getKingdomUseCase = new GetKingdomUseCase(kingdomRepository);
const getKingdomsUseCase = new GetKingdomsUseCase(kingdomRepository);
const updateKingdomUseCase = new UpdateKingdomUseCase(kingdomRepository);
const deleteKingdomUseCase = new DeleteKingdomUseCase(kingdomRepository);

export const createKingdomResolver = new CreateKingdomResolver(createKingdomUseCase);
export const getKingdomResolver = new GetKingdomResolver(getKingdomUseCase);
export const getKingdomsResolver = new GetKingdomsResolver(getKingdomsUseCase);
export const updateKingdomResolver = new UpdateKingdomResolver(updateKingdomUseCase);
export const deleteKingdomResolver = new DeleteKingdomResolver(deleteKingdomUseCase);

const kingdomOverviewQuery = new KingdomOverviewQuery(db);
export const kingdomOverviewResolver = new KingdomOverviewResolver(kingdomOverviewQuery);
