'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SelectReport } from '@/lib/schema';
import { ColumnDef } from '@tanstack/react-table';
import { reportColumns } from './report-columns';
import ReportCreateButton from './report-create-button';
import { DataTable } from '@/components/data-table';

export const ReportsTable = ({ reports }: { reports: SelectReport[] }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>Reports</CardTitle>
          <CardDescription>View and manage your reports.</CardDescription>
        </div>
        <ReportCreateButton />
      </div>
    </CardHeader>
    <CardContent>
      <DataTable
        columns={reportColumns as ColumnDef<SelectReport>[]}
        data={reports}
      />
    </CardContent>
    <CardFooter />
  </Card>
);
