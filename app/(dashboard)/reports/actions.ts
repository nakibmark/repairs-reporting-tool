'use server';
import {
  deleteReport,
  insertReport,
  updateReportStatusById,
} from '@/lib/data/reports';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function deleteReportById(reportId: number) {
  await deleteReport(reportId);
  revalidatePath('/reports', 'page');
}

export async function createReport() {
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
  const [{ id }] = await insertReport(newReport);
  return id;
}

export async function setReportStatus(id: number, status: boolean) {
  await updateReportStatusById(id, status);
  revalidatePath('/reports', 'page');
}
