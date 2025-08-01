'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { SelectServiceLevelType } from '@/lib/schema';

const columnHelper = createColumnHelper<SelectServiceLevelType>();

export const ServiceLevelColumns = [
  columnHelper.accessor('id', {
    header: 'Id',
  }),
  columnHelper.accessor('name', {
    header: 'Service Name',
  }),
  columnHelper.accessor('description', {
    header: 'Service Description',
  }),
];
