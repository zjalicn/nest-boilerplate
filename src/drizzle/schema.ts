import { desc } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
  // id: text('id').unique().primaryKey(),
  username: text('username').notNull().unique(),
  password: text('hashed_password'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const productReferenceTable = pgTable('productReference', {
  id: uuid('uuid1').defaultRandom().unique().primaryKey(),
  stripeProductId: text('stripeProductId').notNull(),
  userId: text('userId').notNull(),
  // createdAt: timestamp('created_at').defaultNow(),
});

export const stripePrices = pgTable('stripePrices', {
  id: text('id').notNull().primaryKey(),
  stripeProductId: text('stripeProductId')
    .notNull()
    .references(() => productReferenceTable.stripeProductId),
  description: text('description'),
});
