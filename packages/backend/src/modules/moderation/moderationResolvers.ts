import { getAuditLogResolver, getBlockRecordsResolver } from './moderationModule';

export const moderationResolvers = {
  Query: {
    auditLog: getAuditLogResolver.resolve,
    blockRecords: getBlockRecordsResolver.resolve,
  },
};
