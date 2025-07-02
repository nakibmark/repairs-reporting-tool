'use server';
import { deleteReport , createReport} from '@/lib/data/reports';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers'

export async function deleteReportById(reportId: number) {
    await deleteReport(reportId);
    revalidatePath('/reports', 'page');
};

export async function CreateReportByReport(report: {partnerId: number, reportYear: number, reportMonth: number, submissionPeriodClosesAt: Date}) {
    const createdId = await createReport(report);
    redirect('/reports/' + createdId);
};

export async function setActivePartner(id: number){
    const cookieStore = await cookies()
    cookieStore.set('partnerId', String(id))
}

export async function getActivePartner(): Promise<number> {
    const cookieStore = await cookies()
    if (cookieStore.has('partnerId')){
        return Number(cookieStore.get('partnerId'))
    }else{
        return -1
    }
}