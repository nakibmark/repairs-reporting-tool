'use client';

import { SelectReport } from '@/lib/schema';
import { createColumnHelper, RowData } from '@tanstack/react-table';
import RowActions from './row-actions';

import '@tanstack/react-table';
import FilterHeader from '../filter-header';
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'submitted' | 'select';
  }
}

const columnHelper = createColumnHelper<SelectReport>();

export const defaultReportColumns = [
  columnHelper.accessor('id', {
    header: 'Report ID',
  }),
  columnHelper.accessor('isSubmitted', {
    header: ({ column }) =>
      column.getCanFilter() ? (
        <FilterHeader column={column} name="Status" />
      ) : (
        'Status'
      ),
    cell: (info) => (info.getValue() ? 'Submitted' : 'Draft'),
    filterFn: 'equals',
    meta: {
      filterVariant: 'submitted',
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
