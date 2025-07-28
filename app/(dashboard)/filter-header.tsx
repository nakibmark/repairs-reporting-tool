import { Column } from '@tanstack/react-table';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
} from '@/components/ui/select';
import { SelectReport } from '@/lib/schema';
import { ListFilterIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';

const FilterHeader = ({
  column,
  name,
}: {
  column: Column<SelectReport, unknown>;
  name: string;
}) => {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};
  const onBooleanChange = (value: string): void => {
    switch (value) {
      case 'true':
        column.setFilterValue(true);
        return;
      case 'false':
        column.setFilterValue(false);
        return;
      case '__clear':
        column.setFilterValue(null);
        return;
    }
  };

  return filterVariant === 'submitted' ? (
    <Select
      value={columnFilterValue?.toString() || ''}
      onValueChange={onBooleanChange}
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
          <SelectItem value={'true'}>Submitted</SelectItem>
          <SelectItem value={'false'}>Draft</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ) : (
    <></>
  );
};

export default FilterHeader;
