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
import { SelectReportItem } from '@/lib/schema';
import { DropdownOption } from './report-item-dropdown';
import { DataTable } from '@/components/data-table';
import { reportItemColumns } from './report-item-columns';
import { ReportItemWithNames } from '@/lib/data/reportItems';
import { ColumnDef } from '@tanstack/react-table';

// Helper function to convert ReportItemWithNames to SelectReportItem for editing
const convertToSelectReportItem = (
  item: ReportItemWithNames
): SelectReportItem => ({
  id: item.id,
  reportId: item.reportId,
  dateIn: item.dateIn,
  dateOut: item.dateOut,
  brandId: item.brand.id,
  repairNo: item.repairNo,
  article: item.article,
  warrantyTypeId: item.warrantyType.id,
  serialNo: item.serialNo,
  serviceLevelTypeId: item.serviceLevelType.id,
  comments: item.comments,
  createdAt: item.createdAt,
  updatedAt: item.updatedAt,
});

export default function ReportItemsTable({
  reportItems,
  reportId,
  dropdownOptions,
}: {
  reportItems: ReportItemWithNames[];
  reportId: number;
  dropdownOptions: {
    brandOptions: DropdownOption[];
    warrantyTypeOptions: DropdownOption[];
    serviceLevelTypeOptions: DropdownOption[];
  };
}) {
  const [isCreatingNewItem, setIsCreatingNewItem] = useState(false);

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
          columns={reportItemColumns as ColumnDef<ReportItemWithNames>[]}
          data={reportItems}
          renderRow={(row) => (
            <ReportItem
              key={row.id}
              reportItem={convertToSelectReportItem(row)}
              reportId={reportId}
              dropdownOptions={dropdownOptions}
            />
          )}
        />
        {isCreatingNewItem && (
          <ReportItem
            key={0}
            reportId={reportId}
            dropdownOptions={dropdownOptions}
            onCancel={() => setIsCreatingNewItem(false)}
          />
        )}
      </CardContent>
      <CardFooter />
    </Card>
  );
}
