import 'server-only';
import { NextResponse } from 'next/server';
import { getServiceLevelTypes } from '@/lib/data/serviceLevelTypes';

export async function GET() {
  const serviceLevelTypes = await getServiceLevelTypes();
  return NextResponse.json({ serviceLevelTypes });
}
