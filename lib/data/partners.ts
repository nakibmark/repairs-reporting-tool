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

export const deletePartnerById = async (partnerId: number) =>
  await db.delete(partners).where(eq(partners.id, partnerId));
