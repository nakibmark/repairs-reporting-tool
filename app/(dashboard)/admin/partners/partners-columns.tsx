'use client';

import { SelectPartner } from '@/lib/schema';
import { createColumnHelper, Row } from '@tanstack/react-table';
import FilterHeader from '@/components/filter-header';

const columnHelper = createColumnHelper<SelectPartner>();

// Custom filter function for multi-select OR logic
const multiSelectFilter = (
  row: Row<SelectPartner>,
  columnId: string,
  filterValue: string[]
) => {
  if (!filterValue || filterValue.length === 0) {
    return true; // Show all rows if no filter is applied
  }

  const cellValue = row.getValue(columnId) as string;
  return filterValue.includes(cellValue);
};

export const partnerColumns = [
  columnHelper.accessor('id', {
    header: 'ID',
  }),
  columnHelper.accessor('partnerName', {
    header: 'Name',
  }),
  columnHelper.accessor('partnerNo', {
    header: 'Number',
  }),
  columnHelper.accessor('emailAddress', {
    header: 'Email Address',
  }),
  columnHelper.accessor('phoneNumber', {
    header: 'Phone Number',
    cell: (info) => info.getValue() || '-',
  }),
  columnHelper.accessor('city', {
    header: ({ column }) =>
      column.getCanFilter() ? (
        <FilterHeader column={column} name="City" />
      ) : (
        'City'
      ),
    cell: (info) => info.getValue() || '-',
    filterFn: multiSelectFilter,
  }),
  columnHelper.accessor('state', {
    header: ({ column }) =>
      column.getCanFilter() ? (
        <FilterHeader column={column} name="State" />
      ) : (
        'State'
      ),
    cell: (info) => info.getValue() || '-',
    filterFn: multiSelectFilter,
  }),
  columnHelper.accessor('country', {
    header: ({ column }) =>
      column.getCanFilter() ? (
        <FilterHeader column={column} name="Country" />
      ) : (
        'Country'
      ),
    cell: (info) => info.getValue() || '-',
    filterFn: multiSelectFilter,
  }),
  columnHelper.accessor('market', {
    header: ({ column }) =>
      column.getCanFilter() ? (
        <FilterHeader column={column} name="Market" />
      ) : (
        'Market'
      ),
    cell: (info) => info.getValue() || '-',
    filterFn: multiSelectFilter,
  }),
  columnHelper.accessor('region', {
    header: ({ column }) =>
      column.getCanFilter() ? (
        <FilterHeader column={column} name="Region" />
      ) : (
        'Region'
      ),
    cell: (info) => info.getValue() || '-',
    filterFn: multiSelectFilter,
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
  }),
];
