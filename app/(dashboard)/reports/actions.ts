'use server';
import {
  deleteReport,
  insertReport,
  updateReportStatusById,
} from '@/lib/data/reports';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function deleteReportAction(reportId: number) {
  await deleteReport(reportId);
  revalidatePath('/reports', 'page');
}

export async function createReportAction() {
  const cookieStore = await cookies();
  const partnerId = cookieStore.get('partnerId')?.value;
  if (!partnerId) {
    throw new Error('Partner ID not set');
  }
  const lastDayThisMonth = new Date(
    new Date().setMonth(new Date().getMonth() + 1, 0)
  );
  const newReport = {
    partnerId: Number(partnerId),
    reportYear: new Date().getFullYear(),
    reportMonth: new Date().getMonth(),
    submissionPeriodClosesAt: lastDayThisMonth,
  };
  const [{ insertedId }] = await insertReport(newReport);
  return insertedId;
}

export async function updateReportStatusAction(
  reportId: number,
  status: boolean
) {
  await updateReportStatusById(reportId, status);
  revalidatePath('/reports', 'page');
}
