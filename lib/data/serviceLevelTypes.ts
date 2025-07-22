'use server';
import { db } from '../db';
import { serviceLevelTypes } from '../schema';
import { eq } from 'drizzle-orm';

const preparedGetServiceLevelTypes = db
  .select({
    id: serviceLevelTypes.id,
    name: serviceLevelTypes.name,
  })
  .from(serviceLevelTypes)
  .where(eq(serviceLevelTypes.isActive, true))
  .prepare('get_service_level_types');

export const getServiceLevelTypes = async () =>
  await preparedGetServiceLevelTypes.execute();
