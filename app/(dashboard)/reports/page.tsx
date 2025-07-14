import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReportsTable } from './reports-table';
import ReportCreateButton from './report-create-button';
import React from 'react';
import { getReports } from './actions';

export default async function ReportsPage() {
  const reports = await getReports();

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
        <ReportsTable reports={reports} submitted={null} />
      </TabsContent>
      <TabsContent value="submitted">
        <ReportsTable reports={reports} submitted={true} />
      </TabsContent>
      <TabsContent value="draft">
        <ReportsTable reports={reports} submitted={false} />
      </TabsContent>
    </Tabs>
  );
}
