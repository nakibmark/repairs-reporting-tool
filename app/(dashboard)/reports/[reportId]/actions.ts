'use server';
import { revalidatePath } from 'next/cache';
import { deleteReportItemById, updateReportItem } from '@/lib/data/reportItems';
import { SelectReportItem } from '@/lib/schema';

export async function deleteReportItemAction(reportItemId: string) {
  await deleteReportItemById(reportItemId);
  revalidatePath('/reports/[reportId]', 'page');
}

export async function updateReportItemAction(reportItem: SelectReportItem) {
  await updateReportItem(reportItem);
  revalidatePath('/reports/[reportId]/page', 'page');
}
