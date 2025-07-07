'use server';
import { deletePartnerById, selectPartners } from '@/lib/data/partners';

export async function getPartners() {
  return await selectPartners();
}

export async function deletePartner(partnerId: number) {
  await deletePartnerById(partnerId);
}
