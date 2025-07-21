'use server';
import { db } from '../db';
import { InsertReport, reports } from '../schema';
import { eq } from 'drizzle-orm';

export async function selectReports(
  reportsPerPage: number,
  currentPage: number,
  partnerId?: string
) {
  const offset = (currentPage - 1) * reportsPerPage;
  const results = await db
    .select()
    .from(reports)
    .where(partnerId ? eq(reports.partnerId, Number(partnerId)) : undefined)
    .limit(reportsPerPage)
    .offset(offset);
  return results;
}

export async function deleteReport(id: number) {
  await db.delete(reports).where(eq(reports.id, id));
}

export async function insertReport(report: InsertReport) {
  return await db.insert(reports).values(report).returning();
}

export async function selectReportStatusById(id: number) {
  return await db.query.reports.findFirst({
    where: eq(reports.id, id),
    columns: { isSubmitted: true },
  });
}

export async function updateReportStatusById(id: number, isSubmitted: boolean) {
  await db.update(reports).set({ isSubmitted }).where(eq(reports.id, id));
}

export async function selectTotalPages(
  reportsPerPage: number,
  partnerId?: number
) {
  const results = partnerId
    ? await db.select().from(reports).where(eq(reports.partnerId, partnerId))
    : await db.select().from(reports);

  return Math.ceil(results.length / reportsPerPage);
}
