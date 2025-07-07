'use server';
import { db } from '../db';
import { partners } from '../schema';
import { eq } from 'drizzle-orm';

export const selectPartnersOptions = async () =>
  await db
    .select({
      id: partners.id,
      name: partners.partnerName,
    })
    .from(partners);

export const selectPartners = async () => await db.select().from(partners);

export async function updatePartnerStatusById(id: number, isActive: boolean) {
  await db.update(partners).set({ isActive }).where(eq(partners.id, id));
}
