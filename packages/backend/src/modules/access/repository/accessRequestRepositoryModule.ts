import { db } from '../../../infra/database/client';
import { AccessRequestRepository } from './accessRequestRepository';
export const accessRequestRepository = new AccessRequestRepository(db);
