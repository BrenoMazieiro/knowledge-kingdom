import type { IAuditLogRepository, AuditLogEntity } from '../repository/types';
import type { IGetAuditLogUseCase } from '../types';

export class GetAuditLogUseCase implements IGetAuditLogUseCase {
  constructor(private readonly auditLogRepository: IAuditLogRepository) {}

  execute = async (entityType: string, entityId: string): Promise<AuditLogEntity[]> => {
    return this.auditLogRepository.findByEntity(entityType, entityId);
  };
}
