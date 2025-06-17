'use server';
import { revalidatePath } from 'next/cache';
import { editReportItemById, deleteReportItemById, ReportItemWithNames, saveReportItemByItem } from '@/lib/data/reportItems';

export async function editReportItem(id: string) {
  await editReportItemById(id);
  revalidatePath('/');
};

export async function deleteReportItem(id: string) {
  await deleteReportItemById(id);
  revalidatePath('/');
};
 
export async function saveReportItem(item: ReportItemWithNames){
  await saveReportItemByItem(item);
};