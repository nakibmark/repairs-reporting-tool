'use server';
import { selectPartners } from '@/lib/data/partners';

export async function getPartners() {
  return await selectPartners();
}
