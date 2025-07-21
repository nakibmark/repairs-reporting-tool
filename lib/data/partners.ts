'use server';
import { db } from '../db';
import { InsertPartner, partners } from '../schema';
import { and, asc, eq, ilike, or } from 'drizzle-orm';

const preparedGetPartnerOptions = db
  .select({
    id: partners.id,
    name: partners.partnerName,
  })
  .from(partners)
  .prepare('get_partner_options');

export const getPartnerOptions = async () =>
  await preparedGetPartnerOptions.execute();

export const findPartners = async ({
  currentPage,
  limit,
  displayInactive,
  query,
}: {
  currentPage: number;
  limit: number;
  displayInactive?: boolean;
  query?: string;
}) => {
  const offset = (currentPage - 1) * limit;
  const where = and(
    !displayInactive ? eq(partners.isActive, true) : undefined,
    query
      ? or(
          ilike(partners.partnerNo, `%${query}%`),
          ilike(partners.partnerName, `%${query}%`)
        )
      : undefined
  );

  const partnerResults = await db.query.partners.findMany({
    where,
    orderBy: [asc(partners.id)],
    offset,
    limit,
  });

  const count = await db.$count(partners, where);

  return {
    partners: partnerResults,
    totalPages: Math.ceil(count / limit),
  };
};

export async function upsertPartner(partner: InsertPartner) {
  return await db
    .insert(partners)
    .values(partner)
    .onConflictDoUpdate({ target: partners.id, set: partner })
    .returning();
}

export async function updatePartnerStatusById(id: number, isActive: boolean) {
  await db.update(partners).set({ isActive }).where(eq(partners.id, id));
}
