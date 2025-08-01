'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { SelectBrand } from '@/lib/schema';

const columnHelper = createColumnHelper<SelectBrand>();

export const BrandsColumns = [
  columnHelper.accessor('id', {
    header: 'Id',
  }),
  columnHelper.accessor('name', {
    header: 'Maison Name',
  }),
];
