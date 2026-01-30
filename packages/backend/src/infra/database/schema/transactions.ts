import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const transactions = pgTable('transactions', {
  id: uuid('id').defaultRandom().primaryKey(),
  accountType: text('account_type').notNull(),
  accountId: uuid('account_id').notNull(),
  type: text('type').notNull(),
  amount: integer('amount').notNull(),
  balanceAfter: integer('balance_after').notNull(),
  referenceType: text('reference_type'),
  referenceId: uuid('reference_id'),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
