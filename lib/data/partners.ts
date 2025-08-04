import 'server-only';
import { db } from '../db';
import { InsertPartner, partners, SelectPartner } from '../schema';
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
  displayInactive,
  query,
}: {
  displayInactive?: boolean;
  query?: string;
}) => {
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
  });

  return {
    partners: partnerResults,
  };
};

export async function insertPartner(partner: InsertPartner) {
  return await db
    .insert(partners)
    .values(partner)
    .onConflictDoNothing()
    .returning({ insertedId: partners.id });
}

export async function updatePartner(partner: SelectPartner) {
  await db.update(partners).set(partner).where(eq(partners.id, partner.id));
}

export async function updatePartnerStatusById(id: number, isActive: boolean) {
  await db.update(partners).set({ isActive }).where(eq(partners.id, id));
}
