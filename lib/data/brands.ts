import { db } from '../db';
import { brands } from '../schema';
import { eq } from 'drizzle-orm';
type Option = {
  id: number
  name: string
}

export const getBrandName = async (id: number): Promise<string> => {
  const result = await db.query.brands.findFirst({
    where: eq(brands.id, id),
    columns: { name: true }
  });
  return result?.name || 'Unknown';
};

export const getBrands = async (): Promise<Option[]> => await db.select().from(brands);

export const getBrandId = async (brandName: string): Promise<number> => {
  const result = await db.query.brands.findFirst({
    where: eq(brands.name, brandName),
    columns: { id: true }
  });
  return result?.id || -1;
}
