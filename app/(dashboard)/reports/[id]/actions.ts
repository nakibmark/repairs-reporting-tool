'use server';
import { revalidatePath } from 'next/cache';
import { editReportItemById } from '@/lib/data/reportItems';

export async function editReportItem(formData: FormData) {
  let id = formData.get('id')
  await 
  revalidatePath('/');
}

export async function deleteReportItem(id: string) {
  await editReportItemById(id);
  revalidatePath("/");
}