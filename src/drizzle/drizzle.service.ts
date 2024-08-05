import { Inject, Injectable } from '@nestjs/common';
import * as schema from 'src/drizzle/schema';
import { DrizzleProvider } from './drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export abstract class DrizzleService {
  constructor(
    @Inject(DrizzleProvider)
    protected readonly db: NodePgDatabase<typeof schema>,
  ) {}
}
