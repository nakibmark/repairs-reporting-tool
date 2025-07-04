'use client';
import { TableCell } from '@/components/ui/table';
import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';

type Option = {
  id: number;
  name: string;
};

const ReportItemDropdown = ({
  isEditing,
  onChange,
  currentValue,
  options,
}: {
  isEditing: boolean;
  onChange: (selectedId: string) => void;
  currentValue?: string;
  options: Option[];
}) => {
  const [open, setOpen] = React.useState(false);

  return isEditing ? (
    <TableCell className="hidden md:table-cell">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {currentValue || 'Select option...'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Filter values..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.name}
                    value={String(option.name)}
                    onSelect={() => {
                      onChange(String(option.id));
                      setOpen(false);
                    }}
                  >
                    {option.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </TableCell>
  ) : (
    <TableCell className="hidden md:table-cell">
      {currentValue || '-'}
    </TableCell>
  );
};

export default ReportItemDropdown;
