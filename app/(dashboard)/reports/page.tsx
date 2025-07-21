import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <ReportCreateButton />
      </div>
      <TabsContent value="all">
        <ReportsTable reports={reports} totalPages={totalPages} />
      </TabsContent>
      <TabsContent value="submitted">
        <ReportsTable reports={reports} totalPages={totalPages} />
      </TabsContent>
      <TabsContent value="draft">
        <ReportsTable reports={reports} totalPages={totalPages} />
      </TabsContent>
    </Tabs>
  );
}
