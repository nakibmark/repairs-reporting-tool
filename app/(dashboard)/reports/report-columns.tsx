'use client';

import { SelectReport } from '@/lib/schema';
import { createColumnHelper } from '@tanstack/react-table';
import RowActions from './row-actions';
import FilterHeader from '@/components/filter-header';

const columnHelper = createColumnHelper<SelectReport>();

export const reportColumns = [
  columnHelper.accessor('id', {
    header: 'Report ID',
  }),
  columnHelper.accessor('isSubmitted', {
    header: ({ column }) =>
      column.getCanFilter() ? (
        <FilterHeader
          column={column}
          name="Status"
          options={[
            { label: 'Submitted', value: 'true' },
            { label: 'Draft', value: 'false' },
          ]}
        />
      ) : (
        'Status'
      ),
    cell: (info) => (info.getValue() ? 'Submitted' : 'Draft'),
    filterFn: (row, columnId, filterValue) => {
      const cellValue = row.getValue(columnId) as boolean;
      if (filterValue === 'true') {
        return cellValue === true; // Show only submitted reports
      } else if (filterValue === 'false') {
        return cellValue === false; // Show only draft reports
      }
      return true; // Show all rows if no filter is applied
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
