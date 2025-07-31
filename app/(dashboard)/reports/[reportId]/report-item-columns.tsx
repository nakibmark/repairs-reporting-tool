'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { SelectReportItem } from '@/lib/schema';

const columnHelper = createColumnHelper<SelectReportItem>();

export const reportItemColumns = [
  columnHelper.accessor('dateIn', {
    header: 'Date Intervention In',
  }),
  columnHelper.accessor('brandId', {
    header: 'Maison',
  }),
  columnHelper.accessor('repairNo', {
    header: 'Repair Number',
  }),
  columnHelper.accessor('article', {
    header: 'Article',
    cell: (info) => info.getValue() || '-',
  }),
  columnHelper.accessor('serialNo', {
    header: 'Serial Number',
    cell: (info) => info.getValue() || '-',
  }),
  columnHelper.accessor('warrantyTypeId', {
    header: 'Warranty Type',
  }),
  columnHelper.accessor('serviceLevelTypeId', {
    header: 'Service Type',
  }),
  columnHelper.accessor('dateOut', {
    header: 'Date Intervention Out',
    cell: (info) => info.getValue() || '-',
  }),
  columnHelper.accessor('comments', {
    header: 'Comments',
    cell: (info) => info.getValue() || '-',
  }),
  columnHelper.display({
    id: 'actions',
    header: () => <span className="sr-only">Actions</span>,
  }),
];
