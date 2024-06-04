import { Pool } from 'pg';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
export const DrizzleProvider = 'drizzleProvider';

export const drizzleProvider = [
  {
    provide: DrizzleProvider,
    useFactory: async () => {
      const pool = new Pool({
        connectionString: process.env.DB_URL!,
      });
      const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
      return db;
    },
    exports: [DrizzleProvider],
  },
];
