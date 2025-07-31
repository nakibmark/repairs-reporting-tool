'use server';
import { revalidatePath } from 'next/cache';
import { deleteReportItemById, upsertReportItem } from '@/lib/data/reportItems';
import { updateReportStatusById } from '@/lib/data/reports';
import { InsertReportItem } from '@/lib/schema';

export async function deleteReportItem(reportItemId: string) {
  await deleteReportItemById(reportItemId);
  revalidatePath('/reports/[reportId]', 'page');
}

export async function saveReportItem(reportItem: InsertReportItem) {
  await upsertReportItem(reportItem);
  revalidatePath('/reports/[reportId]/page', 'page');
}

export async function setReportStatus(id: number, status: boolean) {
  await updateReportStatusById(id, status);
  revalidatePath('/reports/[reportId]/page', 'page');
}
