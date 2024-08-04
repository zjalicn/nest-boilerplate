import { Pool } from 'pg';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { Provider } from '@nestjs/common';
export const DrizzleProvider = 'DrizzleProvider';

export const drizzleProvider: Provider = {
  provide: DrizzleProvider,
  useFactory: async () => {
    const pool = new Pool({
      connectionString: process.env.DB_URL!,
    });
    const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
    return db;
  },
};
