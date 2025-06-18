import { db } from '../db';
import { serviceLevelTypes } from '../schema';
import { eq } from 'drizzle-orm';
type Option = {
    id: number
    name: string
}
export const getServiceLevelTypes = async (): Promise<Option[]> => await db.select({
    id: serviceLevelTypes.id,
    name: serviceLevelTypes.name
}).from(serviceLevelTypes).where(eq(serviceLevelTypes.isActive, true));
