import { auditLogRepository } from './repository/auditLogRepositoryModule';
import { blockRecordRepository } from './repository/blockRecordRepositoryModule';
import { GetAuditLogUseCase } from './getAuditLog/getAuditLogUseCase';
import { GetBlockRecordsUseCase } from './getBlockRecords/getBlockRecordsUseCase';
import { GetAuditLogResolver } from './getAuditLog/getAuditLogResolver';
import { GetBlockRecordsResolver } from './getBlockRecords/getBlockRecordsResolver';

const getAuditLogUseCase = new GetAuditLogUseCase(auditLogRepository);
const getBlockRecordsUseCase = new GetBlockRecordsUseCase(blockRecordRepository);

export const getAuditLogResolver = new GetAuditLogResolver(getAuditLogUseCase);
export const getBlockRecordsResolver = new GetBlockRecordsResolver(getBlockRecordsUseCase);
