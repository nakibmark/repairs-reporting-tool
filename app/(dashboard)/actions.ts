'use server';

import { cookies } from 'next/headers';

export async function setActivePartner(partnerId: string) {
  const cookieStore = await cookies();
  if (partnerId === '__clear') {
    // hacky workaround for radix-ui not allowing "" as a select value as of 2025-07-21
    // https://github.com/radix-ui/primitives/issues/2706
    cookieStore.delete('partnerId');
  } else {
    cookieStore.set('partnerId', partnerId);
  }
}
