import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { houses } from './houses';
import { users } from './users';

export const contents = pgTable('contents', {
  id: uuid('id').defaultRandom().primaryKey(),
  version: integer('version').default(0).notNull(),
  houseId: uuid('house_id')
    .notNull()
    .references(() => houses.id),
  creatorId: uuid('creator_id')
    .notNull()
    .references(() => users.id),
  title: text('title').notNull(),
  type: text('type').notNull(),
  url: text('url'),
  body: text('body'),
  description: text('description'),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
});
