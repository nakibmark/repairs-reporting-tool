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
  onChange: (selectedId: number) => void;
  currentValue?: number | undefined;
  options: Option[] | undefined;
}) => {
  const [open, setOpen] = React.useState(false);

  const selectedOption = currentValue
    ? options?.find((o) => o.id === currentValue)
    : null;

  if (isEditing) {
    return (
      <TableCell className="hidden md:table-cell">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[150px] justify-start">
              {selectedOption?.name || 'Select option...'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Filter values..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {!Array.isArray(options) ? (
                    <CommandItem disabled>Loading options...</CommandItem>
                  ) : (
                    options.map((option) => (
                      <CommandItem
                        key={option.id}
                        value={option.name}
                        onSelect={() => {
                          onChange(option.id);
                          setOpen(false);
                        }}
                      >
                        {option.name}
                      </CommandItem>
                    ))
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </TableCell>
    );
  }

  return (
    <TableCell className="hidden md:table-cell">
      {selectedOption?.name || '-'}
    </TableCell>
  );
};

export default ReportItemDropdown;
