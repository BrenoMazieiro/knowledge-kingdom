import { db } from '../../../infra/database/client';
import { AuditLogRepository } from './auditLogRepository';
export const auditLogRepository = new AuditLogRepository(db);
