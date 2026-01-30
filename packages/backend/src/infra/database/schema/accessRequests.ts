import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';

export const accessRequests = pgTable('access_requests', {
  id: uuid('id').defaultRandom().primaryKey(),
  playerId: uuid('player_id')
    .notNull()
    .references(() => users.id),
  entityType: text('entity_type').notNull(),
  entityId: uuid('entity_id').notNull(),
  status: text('status').default('PENDING').notNull(),
  responseReason: text('response_reason'),
  respondedById: uuid('responded_by_id').references(() => users.id),
  requestedAt: timestamp('requested_at').defaultNow().notNull(),
  respondedAt: timestamp('responded_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
