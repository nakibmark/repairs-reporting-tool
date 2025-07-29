'use server';
import { revalidatePath } from 'next/cache';
import {
  deleteReportItemById,
  ReportItemWithNames,
  upsertReportItem,
} from '@/lib/data/reportItems';
import { updateReportStatusById } from '@/lib/data/reports';

export async function deleteReportItem(reportItemId: string) {
  await deleteReportItemById(reportItemId);
  revalidatePath('/reports/[reportId]', 'page');
}

export async function saveReportItem(item: ReportItemWithNames) {
  upsertReportItem({
    ...item,
    brandId: item.brand.id,
    serviceLevelTypeId: item.serviceLevelType.id,
    warrantyTypeId: item.warrantyType.id,
  });
  revalidatePath('/reports/[reportId]/page', 'page');
}

export async function setReportStatus(id: number, status: boolean) {
  await updateReportStatusById(id, status);
  revalidatePath('/reports/[reportId]/page', 'page');
}
