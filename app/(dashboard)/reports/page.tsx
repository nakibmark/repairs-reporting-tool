import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReportsTable } from './reports-table';
import ReportCreateButton from './report-create-button';
import React from 'react';
import { getReports } from './actions';

export default async function ReportsPage(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const { reports, newOffset, totalReports } = await getReports(
    search,
    Number(offset)
  );

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
        <ReportsTable
          reports={reports}
          offset={newOffset ?? 0}
          totalReports={totalReports}
          submitted={null}
        />
      </TabsContent>
      <TabsContent value="submitted">
        <ReportsTable
          reports={reports}
          offset={newOffset ?? 0}
          totalReports={totalReports}
          submitted={true}
        />
      </TabsContent>
      <TabsContent value="draft">
        <ReportsTable
          reports={reports}
          offset={newOffset ?? 0}
          totalReports={totalReports}
          submitted={false}
        />
      </TabsContent>
    </Tabs>
  );
}
