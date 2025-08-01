'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { SelectWarrantyType } from '@/lib/schema';

const columnHelper = createColumnHelper<SelectWarrantyType>();

export const WarrantyTypeColumns = [
  columnHelper.accessor('id', {
    header: 'Id',
  }),
  columnHelper.accessor('name', {
    header: 'Warranty Name',
  }),
  columnHelper.accessor('description', {
    header: 'Warranty Description',
  }),
];
