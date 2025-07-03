'use server';
import { db } from '../db';
import { partners } from '../schema';

export const getPartners = async () =>
  await db
    .select({
      id: partners.id,
      name: partners.partnerName,
    })
    .from(partners);
