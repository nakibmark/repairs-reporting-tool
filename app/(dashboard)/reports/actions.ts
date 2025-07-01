'use server';
import { deleteReport , createReport} from '@/lib/data/reports';
import { SelectReport } from '@/lib/schema';

import { revalidatePath } from 'next/cache';

export async function deleteReportById(reportId: number) {
    await deleteReport(reportId);
    revalidatePath('/reports', 'page');
};

export async function CreateReportByReport(report: SelectReport) {
    await createReport(report);
    revalidatePath('/reports', 'page');
};
