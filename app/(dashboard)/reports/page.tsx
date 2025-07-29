import { ReportsTable } from './reports-table';
import React from 'react';
import { cookies } from 'next/headers';
import { selectReports } from '@/lib/data/reports';

export default async function ReportsPage() {
  const cookieStore = await cookies();
  const partnerId = cookieStore.get('partnerId')?.value;

  const { reports } = await selectReports({
    query: partnerId,
  });

  return <ReportsTable reports={reports} />;
}
