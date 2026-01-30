import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';
import { backofficeManagers } from './backofficeManagers';

export const kingdoms = pgTable('kingdoms', {
  id: uuid('id').defaultRandom().primaryKey(),
  version: integer('version').default(0).notNull(),
  name: text('name').unique().notNull(),
  description: text('description'),
  iconUrl: text('icon_url'),
  sortOrder: integer('sort_order').default(0).notNull(),
  creatorId: uuid('creator_id').references(() => users.id),
  kingQueenId: uuid('king_queen_id').references(() => users.id),
  visibility: text('visibility').default('PUBLIC').notNull(),
  status: text('status').default('ACTIVE').notNull(),
  blockReason: text('block_reason'),
  treasuryBalance: integer('treasury_balance').default(0).notNull(),
  changedBy: uuid('changed_by').references(() => backofficeManagers.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
});
