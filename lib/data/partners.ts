'use server';
import { db } from '../db';
import { InsertPartner, partners, SelectPartner } from '../schema';
import { eq } from 'drizzle-orm';

export const selectPartnersOptions = async () =>
  await db
    .select({
      id: partners.id,
      name: partners.partnerName,
    })
    .from(partners);

export const selectPartners = async () =>
  await db.select().from(partners).orderBy(partners.id);

export async function updatePartnerStatusById(id: number, isActive: boolean) {
  await db.update(partners).set({ isActive }).where(eq(partners.id, id));
}

export async function updatePartner(partner: SelectPartner) {
  await db
    .update(partners)
    .set({
      partnerName: partner.partnerName,
      emailAddress: partner.emailAddress,
      phoneNumber: partner.phoneNumber,
      city: partner.city,
      state: partner.state,
      country: partner.country,
      market: partner.market,
      region: partner.region,
    })
    .where(eq(partners.id, partner.id));
}

export async function insertPartner(partner: InsertPartner) {
  return await db.insert(partners).values(partner).returning();
}
