'use server';
import {
  updatePartnerStatusById,
  selectPartners,
  updatePartner,
  insertPartner,
  selectPartnersSearch,
  selectTotalPages,
} from '@/lib/data/partners';
import { SelectPartner } from '@/lib/schema';
import { revalidatePath } from 'next/cache';

export async function getPartners(
  currentPage: number,
  displayInactive: boolean,
  partnersPerPage: number
) {
  return await selectPartners(currentPage, displayInactive, partnersPerPage);
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
  query: string,
  currentPage: number,
  displayInactive: boolean,
  partnersPerPage: number
) {
  return await selectPartnersSearch(
    query,
    displayInactive,
    currentPage,
    partnersPerPage
  );
}

export async function getTotalPages(
  partnersPerPage: number,
  query: string,
  displayInactive: boolean
) {
  return await selectTotalPages(partnersPerPage, query, displayInactive);
}
