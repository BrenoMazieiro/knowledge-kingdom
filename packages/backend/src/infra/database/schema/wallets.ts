import { pgTable, uuid, integer, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';

export const wallets = pgTable('wallets', {
  id: uuid('id').defaultRandom().primaryKey(),
  playerId: uuid('player_id')
    .unique()
    .notNull()
    .references(() => users.id),
  balance: integer('balance').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at'),
});
