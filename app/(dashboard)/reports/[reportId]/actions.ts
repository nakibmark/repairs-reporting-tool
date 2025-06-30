'use server';
import { revalidatePath } from 'next/cache';
import { deleteReportItemById, ReportItemWithNames, saveReportItemByItem } from '@/lib/data/reportItems';

export async function deleteReportItem(itemId: string) {
  await deleteReportItemById(itemId);
  revalidatePath('/reports/[reportId]/page', 'page');
};

export async function saveReportItem(item: ReportItemWithNames) {
  await saveReportItemByItem(item);
  revalidatePath('/reports/[reportId]/page', 'page');
};