'use server';
import { deleteReport } from '@/lib/data/reports';

import { revalidatePath } from 'next/cache';

export async function deleteReportById(reportId: number) {
  await deleteReport(reportId);
  revalidatePath('/reports', 'page');
}
