'use server';

import { db } from '../db';
import { serviceLevelTypes } from '../schema';
import { eq } from 'drizzle-orm';

export const getServiceLevelTypes = async () =>
  await db
    .select({
      id: serviceLevelTypes.id,
      name: serviceLevelTypes.name,
    })
    .from(serviceLevelTypes)
    .where(eq(serviceLevelTypes.isActive, true));
