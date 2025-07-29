'use client';

import { Column } from '@tanstack/react-table';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
} from '@/components/ui/select';
import { SelectPartner } from '@/lib/schema';
import { ListFilterIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';

const PartnerFilterHeader = ({
  column,
  name,
}: {
  column: Column<SelectPartner, unknown>;
  name: string;
}) => {
  const columnFilterValue = column.getFilterValue();

  // Get faceted unique values from Tanstack Table
  const facetedUniqueValues = column.getFacetedUniqueValues();
  const sortedUniqueValues = Array.from(facetedUniqueValues.keys())
    .filter((value): value is string => value != null && value !== '')
    .sort();

  const onFilterChange = (value: string): void => {
    if (value === '__clear') {
      column.setFilterValue(null);
    } else {
      column.setFilterValue(value);
    }
  };

  return (
    <Select
      value={columnFilterValue?.toString() || ''}
      onValueChange={onFilterChange}
    >
      <SelectTrigger asChild>
        <Button variant="ghost" className="justify-between">
          {name}
          <ListFilterIcon />
        </Button>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={'__clear'}>Clear filter</SelectItem>
          {sortedUniqueValues.length > 0 && <SelectSeparator />}
          {sortedUniqueValues.map((value) => (
            <SelectItem key={value} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default PartnerFilterHeader;
