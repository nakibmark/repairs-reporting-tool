'use client'
import { TableCell } from '@/components/ui/table';
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const ReportItemDatePicker = ({ isEditing, onChange, value }: { isEditing: boolean, onChange: Function, value: Date | undefined }) => {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(value)

  return isEditing ?
    <TableCell className="hidden md:table-cell">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : ''}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date)
              onChange(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </TableCell>
    :
    <TableCell className="hidden md:table-cell">
      {value?.toLocaleDateString('en-US') || ''}
    </TableCell>
}

export default ReportItemDatePicker