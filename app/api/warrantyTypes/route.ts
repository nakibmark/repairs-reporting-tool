import 'server-only';
import { NextResponse } from 'next/server';
import { getWarrantyTypes } from '@/lib/data/warrantyTypes';

export async function GET() {
  const warrantyTypes = await getWarrantyTypes();
  return NextResponse.json({ warrantyTypes });
}
