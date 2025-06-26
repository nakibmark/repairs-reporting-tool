'use server';
import { revalidatePath } from 'next/cache';
import { deleteReportItemById, ReportItemWithNames, saveReportItemByItem } from '@/lib/data/reportItems';

export async function deleteReportItem(id?: string) {
  if (id) {
    await deleteReportItemById(id);
  }
  revalidatePath('/');
};

export async function saveReportItem(item: Required<ReportItemWithNames>) {
  await saveReportItemByItem(item);
  revalidatePath('/');
};