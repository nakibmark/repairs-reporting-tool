'use server';
import { db } from '../db';
import { InsertReportItem, reportItems } from '../schema';
import { asc, eq, sql } from 'drizzle-orm';

export type ReportItemWithNames = Awaited<
  ReturnType<typeof findReportItemsWithNames>
>[number];

const preparedFindReportItems = db.query.reportItems
  .findMany({
    where: eq(reportItems.reportId, sql.placeholder('reportId')),
    orderBy: [asc(reportItems.createdAt)],
    with: {
      brand: {
        columns: { id: true, name: true },
      },
      warrantyType: {
        columns: { id: true, name: true },
      },
      serviceLevelType: {
        columns: { id: true, name: true },
      },
    },
    columns: {
      brandId: false,
      warrantyTypeId: false,
      serviceLevelTypeId: false,
    },
  })
  .prepare('find_report_items_with_names');

export const findReportItemsWithNames = async (reportId: number) => {
  return await preparedFindReportItems.execute({ reportId });
};

export async function deleteReportItemById(id: string) {
  await db.delete(reportItems).where(eq(reportItems.id, id));
}

export async function upsertReportItem(item: InsertReportItem) {
  await db
    .insert(reportItems)
    .values(item)
    .onConflictDoUpdate({ target: reportItems.id, set: item })
    .returning();
}
