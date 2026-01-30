import { pgTable, uuid, timestamp, primaryKey } from 'drizzle-orm/pg-core';
import { houseGroups } from './houseGroups';
import { houses } from './houses';

export const houseGroupMembers = pgTable(
  'house_group_members',
  {
    houseGroupId: uuid('house_group_id')
      .notNull()
      .references(() => houseGroups.id),
    houseId: uuid('house_id')
      .notNull()
      .references(() => houses.id),
    addedAt: timestamp('added_at').defaultNow().notNull(),
  },
  (table) => [primaryKey({ columns: [table.houseGroupId, table.houseId] })],
);
