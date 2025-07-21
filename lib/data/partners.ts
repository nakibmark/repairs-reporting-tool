'use server';
import { db } from '../db';
import { InsertPartner, partners, SelectPartner } from '../schema';
import { and, eq, ilike, or } from 'drizzle-orm';

export const selectPartnersOptions = async () =>
  await db
    .select({
      id: partners.id,
      name: partners.partnerName,
    })
    .from(partners);

export const selectPartners = async (

  currentPage: number,
  displayInactive: boolean,
  partnersPerPage: number
) => {
  const offset = (currentPage - 1) * partnersPerPage;
  const foundPartners = displayInactive
    ? await db
        .select()
        .from(partners)
        .orderBy(partners.id)
        .limit(partnersPerPage)
        .offset(offset)
    : await db
        .select()
        .from(partners)
        .where(eq(partners.isActive, true))
        .orderBy(partners.id)
        .limit(partnersPerPage)
        .offset(offset);
  return foundPartners;
};

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

export async function selectPartnersSearch(
  search: string,
  displayInactive: boolean,
  currentPage: number,
  partnersPerPage: number
) {
  const offset = (currentPage - 1) * partnersPerPage;
  const foundPartners = displayInactive
    ? await db
        .select()
        .from(partners)
        .where(
          or(
            ilike(partners.partnerNo, '%' + search + '%'),
            ilike(partners.partnerName, '%' + search + '%')
          )
        )
        .orderBy(partners.id)
        .limit(partnersPerPage)
        .offset(offset)
    : await db
        .select()
        .from(partners)
        .where(
          and(
            eq(partners.isActive, true),
            or(
              ilike(partners.partnerNo, '%' + search + '%'),
              ilike(partners.partnerName, '%' + search + '%')
            )
          )
        )
        .orderBy(partners.id)
        .limit(partnersPerPage)
        .offset(offset);
  return foundPartners;
}

export async function selectTotalPages(
  partnersPerPage: number,
  search: string,
  displayInactive: boolean
) {
  const results = search
    ? displayInactive
      ? await db
          .select()
          .from(partners)
          .where(
            or(
              ilike(partners.partnerNo, '%' + search + '%'),
              ilike(partners.partnerName, '%' + search + '%')
            )
          )
          .orderBy(partners.id)
      : await db
          .select()
          .from(partners)
          .where(
            and(
              eq(partners.isActive, true),
              or(
                ilike(partners.partnerNo, '%' + search + '%'),
                ilike(partners.partnerName, '%' + search + '%')
              )
            )
          )
          .orderBy(partners.id)
    : displayInactive
      ? await db.select().from(partners).orderBy(partners.id)
      : await db
          .select()
          .from(partners)
          .where(eq(partners.isActive, true))
          .orderBy(partners.id);
  return Math.ceil(results.length / partnersPerPage);
}
