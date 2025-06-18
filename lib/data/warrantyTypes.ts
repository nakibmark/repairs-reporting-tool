import { db } from '../db';
import { warrantyTypes } from '../schema';
import { eq } from 'drizzle-orm';
type Option = {
    id: number
    name: string
}

export const getWarrantyTypes = async (): Promise<Option[]> => await db.select({
    id: warrantyTypes.id,
    name: warrantyTypes.name
}).from(warrantyTypes).where(eq(warrantyTypes.isActive, true));
