'use server';
import { db } from '../db';
import { warrantyTypes } from '../schema';
import { eq } from 'drizzle-orm';

const preparedGetWarrantyTypes = db
  .select({
    id: warrantyTypes.id,
    name: warrantyTypes.name,
  })
  .from(warrantyTypes)
  .where(eq(warrantyTypes.isActive, true))
  .prepare('get_warranty_types');

export const getWarrantyTypes = async () =>
  await preparedGetWarrantyTypes.execute();
