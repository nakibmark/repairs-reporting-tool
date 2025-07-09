'use server';
import { db } from '../db';
import { InsertReport, reports, SelectReport } from '../schema';
import { count, eq } from 'drizzle-orm';

export async function selectReports(
  offset: number,
  partnerId?: string
): Promise<{
  reports: SelectReport[];
  newOffset: number | null;
  totalReports: number;
}> {
  if (offset === null) {
    return { reports: [], newOffset: null, totalReports: 0 };
  }

  const totalReports = await db
    .select({ count: count() })
    .from(reports)
    .where(partnerId ? eq(reports.partnerId, Number(partnerId)) : undefined);
  const moreReports = await db
    .select()
    .from(reports)
    .where(partnerId ? eq(reports.partnerId, Number(partnerId)) : undefined)
    .limit(20)
    .offset(offset);
  const newOffset = moreReports.length >= 20 ? offset + 20 : null;

  return {
    reports: moreReports,
    newOffset,
    totalReports: totalReports[0].count,
  };
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
