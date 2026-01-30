import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { houses } from './houses';
import { users } from './users';

export const questions = pgTable('questions', {
  id: uuid('id').defaultRandom().primaryKey(),
  version: integer('version').default(0).notNull(),
  houseId: uuid('house_id')
    .notNull()
    .references(() => houses.id),
  creatorId: uuid('creator_id')
    .notNull()
    .references(() => users.id),
  text: text('text').notNull(),
  difficulty: text('difficulty').notNull(),
  explanation: text('explanation'),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
});
