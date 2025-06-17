'use server';
import { revalidatePath } from 'next/cache';
import { editReportItemById, deleteReportItemById } from '@/lib/data/reportItems';
import { redirect } from 'next/navigation'

export async function editReportItem(id: string) {
  await editReportItemById(id);
  revalidatePath('/');
}

export async function deleteReportItem(id: string) {
  await deleteReportItemById(id);
  revalidatePath('/');
}