'use server';

import { cookies } from 'next/headers';
import { selectPartners } from '../../lib/data/partners';

export async function getPartners() {
  return await selectPartners();
}

export async function setActivePartner(formData: FormData) {
  const cookieStore = await cookies();
  const partnerId = formData.get('partnerId');
  cookieStore.set('partnerId', String(partnerId));
}

export async function getActivePartner() {
  const cookieStore = await cookies();
  return cookieStore.get('partnerId')?.value;
}
