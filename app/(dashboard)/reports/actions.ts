'use server';
import {
  deleteReport,
  selectReportStatusById,
  insertReport,
  updateReportStatusById,
  selectReports,
  selectTotalPages,
} from '@/lib/data/reports';
import { revalidatePath } from 'next/cache';
import { getActivePartner } from '../actions';

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

export async function getReportStatus(id: number) {
  const result = await selectReportStatusById(id);
  return result?.isSubmitted ?? false;
}

export async function setReportStatus(id: number, status: boolean) {
  await updateReportStatusById(id, status);
  revalidatePath('/reports', 'page');
}

export async function getReports(reportsPerPage: number, currentPage: number) {
  const reports = await selectReports(
    reportsPerPage,
    currentPage,
    await getActivePartner()
  );
  return reports;
}

export async function getTotalPages(reportsPerPage: number) {
  return await selectTotalPages(
    reportsPerPage,
    Number(await getActivePartner())
  );
}
