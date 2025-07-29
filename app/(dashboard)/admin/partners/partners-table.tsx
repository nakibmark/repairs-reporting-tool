'use client';

import { Label } from '@/components/ui/label';
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
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Partner from './partner';
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { SelectPartner } from '@/lib/schema';
import { Checkbox } from '@/components/ui/checkbox';
import PartnerSearch from './partner-search';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { TanstackPagination } from '@/components/ui/tanstack-pagination';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  PaginationState,
} from '@tanstack/react-table';
import { defaultPartnerColumns } from './partners-columns';

export type DropdownOption = { id: number; name: string };

const PartnersTable = ({
  partners,
  displayInactive,
}: {
  partners: SelectPartner[];
  displayInactive: boolean;
}) => {
  const [isCreatingNewItem, setIsCreatingNewPartner] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const table = useReactTable({
    columns: defaultPartnerColumns,
    data: partners,
    filterFns: {},
    state: {
      columnFilters,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <div>
            <CardTitle>Manage Partners</CardTitle>
            <CardDescription>Edit partner details.</CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-2 space-x-2">
            <PartnerSearch />
            <div className="flex items-center ">
              <Checkbox
                checked={displayInactive}
                id="displayInactive"
                onCheckedChange={() => {
                  const params = new URLSearchParams(searchParams);
                  if (displayInactive) params.delete('displayInactive');
                  else params.set('displayInactive', 'true');
                  params.delete('page');
                  replace(`${pathname}?${params.toString()}`);
                }}
              />
              <Label htmlFor="displayInactive">Display Inactive Partners</Label>
            </div>
            <Button
              type="button"
              onClick={() => setIsCreatingNewPartner(true)}
              size="sm"
              className="h-8 gap-1"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add partner
              </span>
            </Button>
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
              <Partner key={0} displayInactive={displayInactive} />
            )}
            {table.getRowModel().rows?.length ? (
              table
                .getRowModel()
                .rows.map((row) => (
                  <Partner
                    key={row.original.id}
                    partner={row.original}
                    displayInactive={displayInactive}
                  />
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={defaultPartnerColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <TanstackPagination table={table} />
      </CardFooter>
    </Card>
  );
};

export default PartnersTable;
