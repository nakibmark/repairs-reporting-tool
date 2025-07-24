'use client';

import { SelectReport } from '@/lib/schema';
import { createColumnHelper } from '@tanstack/react-table';
import RowActions from './row-actions';

const columnHelper = createColumnHelper<SelectReport>();

export const defaultReportColumns = [
  columnHelper.accessor('id', {
    header: 'Report ID',
  }),
  columnHelper.accessor('isSubmitted', {
    header: 'Status',
    cell: (info) => {
      const isSubmitted = info.getValue();
      return isSubmitted ? 'Submitted' : 'Draft';
    },
  }),
  columnHelper.accessor((row) => `${row.reportMonth}/${row.reportYear}`, {
    id: 'reportMonthYear',
    header: 'Report Month',
  }),
  columnHelper.accessor('createdAt', { header: 'Created Date' }),
  columnHelper.display({
    id: 'actions',
    cell: (props) => <RowActions report={props.row.original} />,
  }),
];
