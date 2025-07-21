'use server';

import { cookies } from 'next/headers';

export async function setActivePartner(partnerId: string) {
  const cookieStore = await cookies();
  cookieStore.set('partnerId', partnerId);
}
