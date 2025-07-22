import 'server-only';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as schema from './schema';

export const db = drizzle(process.env.POSTGRES_URL!, {
  schema,
  casing: 'snake_case',
});
