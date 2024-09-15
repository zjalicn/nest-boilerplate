import { Pool } from 'pg';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { Provider } from '@nestjs/common';
export const DrizzleProvider = 'DrizzleProvider';

const connectionString = `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;

export const drizzleProvider: Provider = {
  provide: DrizzleProvider,
  useFactory: async () => {
    const pool = new Pool({
      connectionString: connectionString,
    });
    const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
    return db;
  },
};
