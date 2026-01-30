import { eq, and, desc } from 'drizzle-orm';
import { auditLog } from '../../../infra/database/schema/auditLog';
import type { DrizzleDB } from '../../../infra/database/client';
import type { AuditLogEntity, IAuditLogRepository } from './types';

export class AuditLogRepository implements IAuditLogRepository {
  constructor(private readonly db: DrizzleDB) {}

  findByEntity = async (entityType: string, entityId: string): Promise<AuditLogEntity[]> => {
    const rows = await this.db
      .select()
      .from(auditLog)
      .where(and(eq(auditLog.entityType, entityType), eq(auditLog.entityId, entityId)))
      .orderBy(desc(auditLog.createdAt));
    return rows.map((r) => this.toEntity(r));
  };

  create = async (data: {
    managerId: string;
    actionType: string;
    entityType: string;
    entityId: string;
    beforeState?: unknown;
    afterState?: unknown;
    reason?: string;
  }): Promise<AuditLogEntity> => {
    const rows = await this.db.insert(auditLog).values(data).returning();
    return this.toEntity(rows[0]!);
  };

  private toEntity(row: typeof auditLog.$inferSelect): AuditLogEntity {
    return {
      id: row.id,
      managerId: row.managerId,
      actionType: row.actionType,
      entityType: row.entityType,
      entityId: row.entityId,
      beforeState: row.beforeState,
      afterState: row.afterState,
      reason: row.reason,
      createdAt: row.createdAt,
    };
  }
}
