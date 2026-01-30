import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { villages } from './villages';

export const houseGroups = pgTable('house_groups', {
  id: uuid('id').defaultRandom().primaryKey(),
  villageId: uuid('village_id')
    .notNull()
    .references(() => villages.id),
  name: text('name').notNull(),
  description: text('description'),
  createdByType: text('created_by_type').notNull(),
  createdById: uuid('created_by_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at'),
});
