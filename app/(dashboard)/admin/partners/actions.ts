'use server';
import { updatePartnerStatusById, upsertPartner } from '@/lib/data/partners';
import { SelectPartner } from '@/lib/schema';
import { revalidatePath } from 'next/cache';

export async function setPartnerInactive(partnerId: number | undefined) {
  if (partnerId) {
    await updatePartnerStatusById(partnerId, false);
    revalidatePath('/admin/partners/page', 'page');
  }
}

export async function savePartner(partner: SelectPartner) {
  await upsertPartner(partner);
  revalidatePath('/admin/partners/page', 'page');
}
