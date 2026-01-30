import { pgTable, uuid, text, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { backofficeManagers } from './backofficeManagers';

export const auditLog = pgTable('audit_log', {
  id: uuid('id').defaultRandom().primaryKey(),
  managerId: uuid('manager_id')
    .notNull()
    .references(() => backofficeManagers.id),
  actionType: text('action_type').notNull(),
  entityType: text('entity_type').notNull(),
  entityId: uuid('entity_id').notNull(),
  beforeState: jsonb('before_state'),
  afterState: jsonb('after_state'),
  reason: text('reason'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
