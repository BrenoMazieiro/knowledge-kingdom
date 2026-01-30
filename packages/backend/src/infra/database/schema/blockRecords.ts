import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { backofficeManagers } from './backofficeManagers';

export const blockRecords = pgTable('block_records', {
  id: uuid('id').defaultRandom().primaryKey(),
  entityType: text('entity_type').notNull(),
  entityId: uuid('entity_id').notNull(),
  blockedById: uuid('blocked_by_id')
    .notNull()
    .references(() => backofficeManagers.id),
  reason: text('reason').notNull(),
  presetMessage: text('preset_message'),
  blockedAt: timestamp('blocked_at').defaultNow().notNull(),
  unblockedAt: timestamp('unblocked_at'),
  unblockedById: uuid('unblocked_by_id').references(() => backofficeManagers.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
