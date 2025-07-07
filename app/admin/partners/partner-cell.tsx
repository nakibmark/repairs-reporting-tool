'use client';

import { Input } from '@/components/ui/input';
import { TableCell } from '@/components/ui/table';
import React, { ChangeEventHandler } from 'react';

const PartnerCell = ({
  isEditing,
  onChange,
  value,
}: {
  isEditing: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string | null | undefined;
}) =>
  isEditing ? (
    <TableCell className="hidden md:table-cell">
      <Input value={value || ''} onChange={onChange} />
    </TableCell>
  ) : (
    <TableCell className="hidden md:table-cell">{value || '-'}</TableCell>
  );

export default PartnerCell;
