'use server';
import {
  insertPartner,
  updatePartnerStatusById,
  updatePartner,
} from '@/lib/data/partners';
import { InsertPartner, SelectPartner } from '@/lib/schema';
import { revalidatePath } from 'next/cache';

export async function updatePartnerStatusAction(
  partnerId: number | undefined,
  isActive: boolean
) {
  if (partnerId) {
    await updatePartnerStatusById(partnerId, isActive);
    revalidatePath('/admin/partners/page', 'page');
  }
}

export async function updatePartnerAction(partner: SelectPartner) {
  await updatePartner(partner);
  revalidatePath('/admin/partners/page', 'page');
}

export async function createPartnerAction(partner: InsertPartner) {
  await insertPartner(partner);
  revalidatePath('/admin/partners/page', 'page');
}
