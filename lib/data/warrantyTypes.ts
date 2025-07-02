'use server';
import { db } from '../db';
import { warrantyTypes } from '../schema';
import { eq } from 'drizzle-orm';

export const getWarrantyTypes = async () =>
  await db
    .select({
      id: warrantyTypes.id,
      name: warrantyTypes.name,
    })
    .from(warrantyTypes)
    .where(eq(warrantyTypes.isActive, true));
