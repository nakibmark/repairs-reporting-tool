'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
  TableCell,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ReportItem from './report-item';
import { ReportItemWithNames } from '@/lib/data/reportItems';
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { defaultReportItemColumns } from './report-items-columns';

import { setReportStatus } from '../actions';

export type DropdownOption = { id: number; name: string };

const ReportItemsTable = ({
  tableProps,
}: {
  tableProps: {
    items: ReportItemWithNames[];
    brands: DropdownOption[];
    serviceLevelTypes: DropdownOption[];
    warrantyTypes: DropdownOption[];
    readOnly: boolean;
    reportId: number;
  };
}) => {
  const {
    items,
    brands,
    serviceLevelTypes,
    warrantyTypes,
    readOnly,
    reportId,
  } = tableProps;

  const [isCreatingNewItem, setIsCreatingNewItem] = useState(
    items.length === 0 && !readOnly
  );

  const table = useReactTable({
    columns: defaultReportItemColumns,
    data: items,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <div>
            <CardTitle>Report Details</CardTitle>
            <CardDescription>View your report details.</CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <CardAction>
              <Button
                type="button"
                disabled={readOnly}
                onClick={() => setIsCreatingNewItem(true)}
                size="sm"
                className="h-8 gap-1"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Repair
                </span>
              </Button>
              <Button
                type="button"
                onClick={() => setReportStatus(reportId, !readOnly)}
                size="sm"
                className="h-8 gap-1"
              >
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  {readOnly ? 'Edit Report' : 'Submit Report'}
                </span>
              </Button>
            </CardAction>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="hidden md:table-cell">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isCreatingNewItem && (
              <ReportItem
                key={0}
                brands={brands}
                serviceLevelTypes={serviceLevelTypes}
                warrantyTypes={warrantyTypes}
                readOnly={readOnly}
              />
            )}
            {table.getRowModel().rows?.length ? (
              table
                .getRowModel()
                .rows.map((row) => (
                  <ReportItem
                    key={row.original.id}
                    item={row.original}
                    brands={brands}
                    serviceLevelTypes={serviceLevelTypes}
                    warrantyTypes={warrantyTypes}
                    readOnly={readOnly}
                  />
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={defaultReportItemColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ReportItemsTable;
