import { ReportsTable } from './reports-table';
import ReportCreateButton from './report-create-button';
import React from 'react';
import { cookies } from 'next/headers';
import { selectReports } from '@/lib/data/reports';
import { flattenSearchParams } from 'app/utils/flattenSearchParams';
import { SearchParams } from 'next/dist/server/request/search-params';

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const cookieStore = await cookies();
  const partnerId = cookieStore.get('partnerId')?.value;
  const { page = '1', size = '10' } =
    await searchParams.then(flattenSearchParams);

  const { reports, totalPages } = await selectReports({
    currentPage: +page,
    limit: +size,
    query: partnerId,
  });

  return (
    <div>
      <div className="flex items-center">
        <ReportCreateButton />
      </div>
      <ReportsTable reports={reports} totalPages={totalPages} />
    </div>
  );
}
