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

export async function setActivePartner(formData: FormData){
    const cookieStore = await cookies()
    const partnerId = formData.get('partnerId')
    await cookieStore.set('partnerId', String(partnerId))
}

export async function getActivePartner(): Promise<number> {
    const cookieStore = await cookies()
    if (cookieStore.has('partnerId')){
        return Number(await cookieStore.get('partnerId')?.value)
    }else{
        return -1
    }
}