'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
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
  };
}) => {
  const { items, brands, serviceLevelTypes, warrantyTypes, readOnly } =
    tableProps;
  const [isCreatingNewItem, setIsCreatingNewItem] = useState(
    items.length === 0 && readOnly
  );

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
                onClick={() => setIsCreatingNewItem(true)}
                size="sm"
                className="h-8 gap-1"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Report Item
                </span>
              </Button>
            </CardAction>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:table-cell">
                Date Intervention In
              </TableHead>
              <TableHead className="hidden md:table-cell">Maison</TableHead>
              <TableHead className="hidden md:table-cell">
                Repair Number
              </TableHead>
              <TableHead className="hidden md:table-cell">Article</TableHead>
              <TableHead className="hidden md:table-cell">
                Serial Number
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Warranty Type
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Service Type
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Date Intervention Out
              </TableHead>
              <TableHead className="hidden md:table-cell">Comments</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isCreatingNewItem ? (
              <ReportItem
                key={0}
                brands={brands}
                serviceLevelTypes={serviceLevelTypes}
                warrantyTypes={warrantyTypes}
                readOnly={readOnly}
              />
            ) : (
              <></>
            )}
            {items.map((item) => (
              <ReportItem
                key={item.id}
                item={item}
                brands={brands}
                serviceLevelTypes={serviceLevelTypes}
                warrantyTypes={warrantyTypes}
                readOnly={readOnly}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ReportItemsTable;
