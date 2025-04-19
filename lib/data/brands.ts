import { db } from '../db';
import { brands } from '../schema';
import { eq } from 'drizzle-orm';

export const getBrandName = async (id: number): Promise<string> => {
  const result = await db.query.brands.findFirst({
    where: eq(brands.id, id),
    columns: { name: true }
  });
  return result?.name || 'Unknown';
};
