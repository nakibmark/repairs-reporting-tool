'use server';
import { revalidatePath } from 'next/cache';
import { deleteReportItemById, ReportItemWithNames, saveReportItemByItem } from '@/lib/data/reportItems';
import { getBrands } from '@/lib/data/brands';
import { getServiceLevelTypes } from '@/lib/data/serviceLevelTypes';
import { getWarrantyTypes } from '@/lib/data/warrantyTypes';

export async function deleteReportItem(id: string) {
  await deleteReportItemById(id);
  revalidatePath('/');
};

export async function saveReportItem(item: ReportItemWithNames) {
  await saveReportItemByItem(item);
  revalidatePath('/');
};

export async function fetchBrands() {
  return getBrands();
}

export async function fetchServiceLevelTypes() {
  return getServiceLevelTypes();
}

export async function fetchWarrantyTypes() {
  return getWarrantyTypes()
}