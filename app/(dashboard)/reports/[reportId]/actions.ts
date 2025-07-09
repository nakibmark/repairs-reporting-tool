'use server';
import { revalidatePath } from 'next/cache';
import {
  deleteReportItemById,
  ReportItemWithNames,
  updateReportItem,
  createReportItem,
} from '@/lib/data/reportItems';
import {
  selectReportStatusById,
  updateReportStatusById,
} from '@/lib/data/reports';

export async function deleteReportItem(itemId?: string) {
  if (itemId) {
    await deleteReportItemById(itemId);
    revalidatePath('/reports/[reportId]/page', 'page');
  }
}

export async function saveReportItem(item: ReportItemWithNames) {
  if (item.id) {
    await updateReportItem(item);
  } else {
    await createReportItem(item);
  }
  revalidatePath('/reports/[reportId]/page', 'page');
}

export async function getReportStatus(id: number) {
  const result = await selectReportStatusById(id);
  return result?.isSubmitted ?? false;
}

export async function setReportStatus(id: number, status: boolean) {
  await updateReportStatusById(id, status);
  revalidatePath('/reports/[reportId]/page', 'page');
}
