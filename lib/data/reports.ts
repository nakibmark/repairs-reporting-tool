'use server';
import { db } from '../db';
import { InsertReport, reports } from '../schema';
import { eq, sql } from 'drizzle-orm';

export const selectReports = async ({
  currentPage,
  limit,
  query,
}: {
  currentPage: number;
  limit: number;
  query?: string;
}) => {
  const offset = (currentPage - 1) * limit;
  const where = query ? eq(reports.partnerId, +query) : undefined;
  const reportResults = await db
    .select()
    .from(reports)
    .where(where)
    .orderBy(reports.submissionPeriodClosesAt)
    .limit(limit)
    .offset(offset);

  const count = await db.$count(reports, where);

  return { reports: reportResults, totalPages: Math.ceil(count / limit) };
};

const preparedFindReportStatusById = db.query.reports
  .findFirst({
    where: eq(reports.id, sql.placeholder('id')),
    columns: { isSubmitted: true },
  })
  .prepare('find_report_status_by_id');

export const findReportStatusById = async (id: number) =>
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
