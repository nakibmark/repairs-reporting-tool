import { db } from '../db';
import { reports, SelectReport } from '../schema';
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
        limit: 1000
      }),
      newOffset: null,
      totalReports: 0
    };
  }

  if (offset === null) {
    return { reports: [], newOffset: null, totalReports: 0 };
  }

  let totalReports = await db.select({ count: count() }).from(reports);
  let moreReports = await db.select().from(reports).limit(5).offset(offset);
  let newOffset = moreReports.length >= 5 ? offset + 5 : null;

  return {
    reports: moreReports,
    newOffset,
    totalReports: totalReports[0].count
  };
}

export async function deleteReport(id: number) {
  await db.delete(reports).where(eq(reports.id, id));
};
