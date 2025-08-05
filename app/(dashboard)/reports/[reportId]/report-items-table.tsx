'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ReportItem from './report-item';
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import DataTable from '@/components/data-table';
import { reportItemColumns } from './report-item-columns';
import { ColumnDef } from '@tanstack/react-table';
import { SelectReportItem } from '@/lib/schema';
import { signIn } from 'next-auth/react';

export default function ReportItemsTable({
  reportItems,
}: {
  reportItems: SelectReportItem[];
}) {
  const [isCreatingNewItem, setIsCreatingNewItem] = useState(false);
  signIn('okta');
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <div>
            <CardTitle>Report Items</CardTitle>
            <CardDescription>
              Manage the items associated with this report.
            </CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button
              type="button"
              onClick={() => setIsCreatingNewItem(true)}
              size="sm"
              className="h-8 gap-1"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add item
              </span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={reportItemColumns as ColumnDef<SelectReportItem>[]}
          data={reportItems}
          renderRow={(row) => <ReportItem key={row.id} reportItem={row} />}
        />
        {isCreatingNewItem && (
          <ReportItem key={0} onCancel={() => setIsCreatingNewItem(false)} />
        )}
      </CardContent>
      <CardFooter />
    </Card>
  );
}
