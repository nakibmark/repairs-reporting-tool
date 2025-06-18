import { TableCell } from '@/components/ui/table';
import { ReportItemWithNames } from '@/lib/data/reportItems';
import React, { ChangeEventHandler } from 'react';

const ReportItemCell = ({ editState, onChange, valueEdit, valueStatic }: { editState: boolean, onChange: ChangeEventHandler<HTMLInputElement>, valueEdit: string, valueStatic: (string | null) }) => {
  if (editState) {
    return (
      <TableCell className="hidden md:table-cell">
        <input
          value={valueEdit}
          onChange={onChange}
        />
      </TableCell>
    )
  } else {
    return (
      <TableCell className="hidden md:table-cell">
        {valueStatic}
      </TableCell>
    )
  }
}

export default ReportItemCell