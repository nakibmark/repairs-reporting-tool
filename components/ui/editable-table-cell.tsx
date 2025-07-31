'use client';

import { Input } from '@/components/ui/input';
import { TableCell } from '@/components/ui/table';
import React, { ChangeEventHandler } from 'react';

const EditableTableCell = ({
  isEditing,
  onChange,
  value,
}: {
  isEditing: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string | null | undefined | number;
}) =>
  isEditing ? (
    <TableCell className="hidden md:table-cell">
      <Input value={value || ''} onChange={onChange} />
    </TableCell>
  ) : (
    <TableCell className="hidden md:table-cell">{value || '-'}</TableCell>
  );

export default EditableTableCell;
