'use server';
import { deletePartnerById, selectPartners } from '@/lib/data/partners';
import { revalidatePath } from 'next/cache';

export async function getPartners() {
  return await selectPartners();
}

export async function deletePartner(partnerId: number | undefined) {
  if (partnerId) {
    await deletePartnerById(partnerId);
    revalidatePath('/admin/partners/page', 'page');
  }
}
