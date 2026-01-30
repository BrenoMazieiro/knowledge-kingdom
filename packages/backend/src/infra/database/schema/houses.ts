import { pgTable, uuid, text, integer, boolean, timestamp } from 'drizzle-orm/pg-core';
import { villages } from './villages';
import { users } from './users';
import { backofficeManagers } from './backofficeManagers';

export const houses = pgTable('houses', {
  id: uuid('id').defaultRandom().primaryKey(),
  version: integer('version').default(0).notNull(),
  villageId: uuid('village_id')
    .notNull()
    .references(() => villages.id),
  creatorId: uuid('creator_id')
    .notNull()
    .references(() => users.id),
  ownerType: text('owner_type').default('PLAYER').notNull(),
  managerId: uuid('manager_id').references(() => users.id),
  name: text('name').notNull(),
  description: text('description'),
  iconUrl: text('icon_url'),
  isFree: boolean('is_free').default(true).notNull(),
  entryPrice: integer('entry_price'),
  testQuestionCount: integer('test_question_count').default(5).notNull(),
  testEasyCount: integer('test_easy_count').default(2).notNull(),
  testMediumCount: integer('test_medium_count').default(1).notNull(),
  testHardCount: integer('test_hard_count').default(2).notNull(),
  visibility: text('visibility').default('PUBLIC').notNull(),
  status: text('status').default('ACTIVE').notNull(),
  blockReason: text('block_reason'),
  sortOrder: integer('sort_order').default(0).notNull(),
  changedBy: uuid('changed_by').references(() => backofficeManagers.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
});
