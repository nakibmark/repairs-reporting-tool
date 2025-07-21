'use server';
import { db } from '../db';
import { InsertReport, reports } from '../schema';
import { eq, sql } from 'drizzle-orm';

export async function selectReports(
  currentPage: number,
  reportsPerPage: number,
  partnerId?: string
) {
  const offset = (currentPage - 1) * reportsPerPage;
  const results = await db
    .select()
    .from(reports)
    .where(partnerId ? eq(reports.partnerId, Number(partnerId)) : undefined)
    .orderBy(reports.submissionPeriodClosesAt)
    .limit(reportsPerPage)
    .offset(offset);
  return results;
}

const preparedFindReportStatusById = db.query.reports
  .findFirst({
    where: eq(reports.id, sql.placeholder('id')),
    columns: { isSubmitted: true },
  })
  .prepare('find_report_status_by_id');

export const selectReportStatusById = async (id: number) =>
  await preparedFindReportStatusById.execute({ id }).then((result) => {
    if (!result) {
      throw new Error(`Report for ID ${id} not found`);
    }
    return result.isSubmitted;
  });

export async function deleteReport(id: number) {
  await db.delete(reports).where(eq(reports.id, id));
}

export async function insertReport(report: InsertReport) {
  return await db.insert(reports).values(report).returning();
}

export async function updateReportStatusById(id: number, isSubmitted: boolean) {
  await db.update(reports).set({ isSubmitted }).where(eq(reports.id, id));
}
