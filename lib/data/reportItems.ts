import 'server-only';
import { db } from '../db';
import { InsertReportItem, reportItems, SelectReportItem } from '../schema';
import { asc, eq, sql } from 'drizzle-orm';

const preparedSelectReportItems = db
  .select()
  .from(reportItems)
  .where(eq(reportItems.reportId, sql.placeholder('reportId')))
  .orderBy(asc(reportItems.createdAt))
  .prepare('select_report_items_by_report_id');

export async function selectReportItemsByReportId(reportId: number) {
  return await preparedSelectReportItems.execute({ reportId });
}

export async function deleteReportItemById(id: string) {
  await db.delete(reportItems).where(eq(reportItems.id, id));
}

export async function insertReportItem(item: InsertReportItem) {
  return await db
    .insert(reportItems)
    .values(item)
    .onConflictDoNothing()
    .returning({ insertedId: reportItems.id });
}

export async function updateReportItem(item: SelectReportItem) {
  await db.update(reportItems).set(item).where(eq(reportItems.id, item.id));
}
