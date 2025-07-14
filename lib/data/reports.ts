'use server';
import { db } from '../db';
import { InsertReport, reports } from '../schema';
import { eq } from 'drizzle-orm';

export async function selectReports(
  partnerId?: string,
  reportsPerPage?: number,
  currentPage?: number
) {
  const offset =
    currentPage && reportsPerPage ? (currentPage - 1) * reportsPerPage : null;
  const results =
    reportsPerPage && offset
      ? await db
          .select()
          .from(reports)
          .where(
            partnerId ? eq(reports.partnerId, Number(partnerId)) : undefined
          )
          .limit(reportsPerPage)
          .offset(offset)
      : await db
          .select()
          .from(reports)
          .where(
            partnerId ? eq(reports.partnerId, Number(partnerId)) : undefined
          );
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
