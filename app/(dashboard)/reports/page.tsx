import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReportsTable } from './reports-table';
import ReportCreateButton from './report-create-button';
import React from 'react';
import { getReports, getTotalPages } from './actions';

export default async function ReportsPage(props: {
  searchParams?: Promise<{
    page?: string;
    reportsPerPage?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const reportsPerPage = Number(searchParams?.reportsPerPage) || 10;
  const totalPages = await getTotalPages(reportsPerPage);
  const reports = await getReports(reportsPerPage, currentPage);

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
          submitted={null}
          totalPages={totalPages}
        />
      </TabsContent>
      <TabsContent value="submitted">
        <ReportsTable
          reports={reports}
          submitted={true}
          totalPages={totalPages}
        />
      </TabsContent>
      <TabsContent value="draft">
        <ReportsTable
          reports={reports}
          submitted={false}
          totalPages={totalPages}
        />
      </TabsContent>
    </Tabs>
  );
}
