import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { kingdoms } from './kingdoms';
import { users } from './users';
import { backofficeManagers } from './backofficeManagers';

export const villages = pgTable('villages', {
  id: uuid('id').defaultRandom().primaryKey(),
  version: integer('version').default(0).notNull(),
  kingdomId: uuid('kingdom_id')
    .notNull()
    .references(() => kingdoms.id),
  name: text('name').notNull(),
  description: text('description'),
  iconUrl: text('icon_url'),
  sortOrder: integer('sort_order').default(0).notNull(),
  creatorId: uuid('creator_id').references(() => users.id),
  chancellorId: uuid('chancellor_id').references(() => users.id),
  managerId: uuid('manager_id').references(() => users.id),
  visibility: text('visibility').default('PUBLIC').notNull(),
  status: text('status').default('ACTIVE').notNull(),
  blockReason: text('block_reason'),
  treasuryBalance: integer('treasury_balance').default(0).notNull(),
  changedBy: uuid('changed_by').references(() => backofficeManagers.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
});
