import { pgTable, uuid, integer, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';
import { houses } from './houses';

export const houseEntries = pgTable('house_entries', {
  id: uuid('id').defaultRandom().primaryKey(),
  playerId: uuid('player_id')
    .notNull()
    .references(() => users.id),
  houseId: uuid('house_id')
    .notNull()
    .references(() => houses.id),
  pricePaid: integer('price_paid').default(0).notNull(),
  enteredAt: timestamp('entered_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
