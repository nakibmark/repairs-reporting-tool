'use server';
import { deleteReport , createReport} from '@/lib/data/reports';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function deleteReportById(reportId: number) {
    await deleteReport(reportId);
    revalidatePath('/reports', 'page');
};

export async function CreateReportByReport(report: {partnerId: number, reportYear: number, reportMonth: number, submissionPeriodClosesAt: Date}) {
    const createdId = await createReport(report);
    redirect('/reports/' + createdId);
};
