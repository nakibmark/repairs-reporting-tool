'use server';
import { deleteReport, insertReport } from '@/lib/data/reports';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function deleteReportById(reportId: number) {
  await deleteReport(reportId);
  revalidatePath('/reports', 'page');
}

export async function createReport() {
  const partnerId = await getActivePartner();
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

export async function setActivePartner(formData: FormData) {
  const cookieStore = await cookies();
  const partnerId = formData.get('partnerId');
  cookieStore.set('partnerId', String(partnerId));
}

export async function getActivePartner() {
  const cookieStore = await cookies();
  return cookieStore.get('partnerId')?.value;
}
