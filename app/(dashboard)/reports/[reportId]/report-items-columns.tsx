'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { ReportItemWithNames } from '@/lib/data/reportItems';

const columnHelper = createColumnHelper<ReportItemWithNames>();

export const defaultReportItemColumns = [
  columnHelper.accessor('dateIn', {
    header: 'Date Intervention In',
  }),
  columnHelper.accessor('brand.name', {
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
  columnHelper.accessor('warrantyType.name', {
    header: 'Warranty Type',
  }),
  columnHelper.accessor('serviceLevelType.name', {
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
