'use server';
import { updatePartnerStatusById, selectPartners } from '@/lib/data/partners';
import { revalidatePath } from 'next/cache';

export async function getPartners() {
  return await selectPartners();
}

export async function deletePartner(partnerId: number | undefined) {
  if (partnerId) {
    await updatePartnerStatusById(partnerId, false);
    revalidatePath('/admin/partners/page', 'page');
  }
}
