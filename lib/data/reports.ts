'use server';
import { db } from '../db';
import { InsertReport, reports, SelectReport } from '../schema';
import { count, eq, ilike } from 'drizzle-orm';

export async function getReports(
  search: string,
  offset: number
): Promise<{
  reports: SelectReport[];
  newOffset: number | null;
  totalReports: number;
}> {
  if (search) {
    return {
      reports: await db.query.reports.findMany({
        where: ilike(reports.id, `%${search}%`),
        limit: 1000,
      }),
      newOffset: null,
      totalReports: 0,
    };
  }

  if (offset === null) {
    return { reports: [], newOffset: null, totalReports: 0 };
  }

  const totalReports = await db.select({ count: count() }).from(reports);
  const moreReports = await db.select().from(reports).limit(20).offset(offset);
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

export async function getReportStatusById(id: number) {
  const results = await db
    .select({ field1: reports.isSubmitted })
    .from(reports)
    .where(eq(reports.id, id));
  return results[0].field1;
}

export async function updateReportStatusById(id: number, isSubmitted: boolean) {
  await db.update(reports).set({ isSubmitted }).where(eq(reports.id, id));
}
