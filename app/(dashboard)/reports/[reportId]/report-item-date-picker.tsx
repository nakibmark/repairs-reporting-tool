'use client';
import { TableCell } from '@/components/ui/table';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TZDate } from 'react-day-picker';
import { format } from 'date-fns';

const ReportItemDatePicker = ({
  isEditing,
  onChange,
  value,
}: {
  isEditing: boolean;
  onChange: (date: string) => void;
  value: string | null | undefined;
}) => {
  const [open, setOpen] = React.useState(false);

  const dateValue = value ? new TZDate(value, 'UTC') : undefined;

  return isEditing ? (
    <TableCell className="hidden md:table-cell">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {value || 'Select Date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={dateValue}
            defaultMonth={dateValue}
            timeZone="UTC"
            captionLayout="dropdown"
            onSelect={(date) => {
              onChange(date ? format(date, 'yyyy-MM-dd') : '');
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </TableCell>
  ) : (
    <TableCell className="hidden md:table-cell">{value || '-'}</TableCell>
  );
};

export default ReportItemDatePicker;
