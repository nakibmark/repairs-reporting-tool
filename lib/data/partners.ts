'use server';
import { db } from '../db';
import { partners } from '../schema';

export const selectPartnersOptions = async () =>
  await db
    .select({
      id: partners.id,
      name: partners.partnerName,
    })
    .from(partners);

export const selectPartners = async () => await db.select().from(partners);
