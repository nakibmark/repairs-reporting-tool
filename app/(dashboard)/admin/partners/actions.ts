'use server';
import {
  updatePartnerStatusById,
  selectPartners,
  updatePartner,
  insertPartner,
  selectPartnersSearch,
} from '@/lib/data/partners';
import { SelectPartner } from '@/lib/schema';
import { revalidatePath } from 'next/cache';

export async function getPartners(
  currentPage: number,
  displayInactive: boolean
) {
  return await selectPartners(currentPage, 10, displayInactive);
}

export async function deletePartner(partnerId: number | undefined) {
  console.log(partnerId);
  if (partnerId) {
    await updatePartnerStatusById(partnerId, false);
    revalidatePath('/admin/partners/page', 'page');
  }
}

export async function savePartner(partner: SelectPartner) {
  if (partner.id) {
    await updatePartner(partner);
  } else {
    await insertPartner(partner);
  }
  revalidatePath('/admin/partners/page', 'page');
}

export async function searchPartners(
  search: string,
  currentPage: number,
  displayInactive: boolean
) {
  return await selectPartnersSearch(search, currentPage, 10, displayInactive);
}
