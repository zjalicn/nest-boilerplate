import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { v4 as uuidv4 } from 'uuid';

export const userTable = pgTable('user', {
  id: text('id').unique().primaryKey().default(uuidv4()),
  email: text('email').notNull().unique(),
  password: text('hashed_password'),
  createdAt: timestamp('created_at').defaultNow(),
  stripeCustomerId: text('stripe_customer_id').unique(),
});
