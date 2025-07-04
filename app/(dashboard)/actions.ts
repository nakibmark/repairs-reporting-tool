'use server';

import { cookies } from 'next/headers';
import { selectPartners } from '../../lib/data/partners';

export async function getPartners() {
  return await selectPartners();
}

export async function setActivePartner(partnerId: string) {
  const cookieStore = await cookies();
  cookieStore.set('partnerId', partnerId);
  console.log('Cookies set: ', cookieStore.getAll());
}

export async function getActivePartner() {
  const cookieStore = await cookies();
  return cookieStore.get('partnerId')?.value;
}
