'use server';
import {
  updatePartnerStatusById,
  selectPartners,
  updatePartner,
} from '@/lib/data/partners';
import { SelectPartner } from '@/lib/schema';
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

export async function savePartner(partner: SelectPartner) {
  await updatePartner(partner);
}
