import 'server-only'
import { cache } from 'react';
import { db } from '../db';
import { brands, SelectBrand } from '../schema';
import { eq } from 'drizzle-orm';

export const getBrandName = cache(async (id: number): Promise<string> => {
  const result = await db.query.brands.findFirst({
    where: eq(brands.id, id),
    columns: { name: true }
  });
  return result?.name || 'Unknown';
})

export const getBrands = cache(async (): Promise<SelectBrand[]> => await db.select().from(brands))


export const getBrandId = cache(async (brandName: string): Promise<number> => {
  const result = await db.query.brands.findFirst({
    where: eq(brands.name, brandName),
    columns: { id: true }
  });
  return result?.id || -1;
})
