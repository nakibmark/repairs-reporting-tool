'use client';

import { Column } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
} from '@/components/ui/select';
import { ListFilterIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
const FilterHeader = <TData, TValue>({
  column,
  name,
  options,
}: {
  column: Column<TData, TValue>;
  name: string;
  options?: { label: string; value: string }[];
}) => {
  const columnFilterValue = column.getFilterValue();

  if (options) {
    return (
      <Select
        value={columnFilterValue?.toString() || ''}
        onValueChange={(value) =>
          column.setFilterValue(value === '__clear' ? null : value)
        }
      >
        <SelectTrigger asChild>
          <Button variant="ghost">
            {name}
            <ListFilterIcon />
          </Button>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={'__clear'}>Clear filter</SelectItem>
            <SelectSeparator />
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  const selectedValues = (columnFilterValue as string[] | undefined) || [];

  // Get faceted unique values from Tanstack Table
  const facetedUniqueValues = column.getFacetedUniqueValues();
  const sortedUniqueValues = Array.from(facetedUniqueValues.keys())
    .filter((value): value is string => value != null && value !== '')
    .sort();

  const handleValueToggle = (value: string): void => {
    const currentValues = selectedValues || [];
    if (currentValues.includes(value)) {
      // Remove value if already selected
      const newValues = currentValues.filter((v) => v !== value);
      column.setFilterValue(newValues.length > 0 ? newValues : undefined);
    } else {
      // Add value to selection
      column.setFilterValue([...currentValues, value]);
    }
  };

  const clearFilter = (): void => {
    column.setFilterValue(undefined);
  };

  const selectAll = (): void => {
    column.setFilterValue(sortedUniqueValues);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="justify-between">
          <div className="flex items-center gap-1">
            {name}
            {selectedValues.length > 0 && (
              <Badge variant="secondary" className="ml-1 h-4 text-xs">
                {selectedValues.length}
              </Badge>
            )}
          </div>
          <ListFilterIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Filter by {name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={false}
          onCheckedChange={clearFilter}
          className="font-medium"
        >
          Clear filter
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedValues.length === sortedUniqueValues.length}
          onCheckedChange={selectAll}
          className="font-medium"
        >
          Select all
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        {sortedUniqueValues.map((value) => (
          <DropdownMenuCheckboxItem
            key={value}
            checked={selectedValues.includes(value)}
            onCheckedChange={() => handleValueToggle(value)}
          >
            {value}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterHeader;
