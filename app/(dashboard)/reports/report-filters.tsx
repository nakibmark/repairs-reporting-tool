/* eslint-disable */
import { Column, RowData } from '@tanstack/react-table';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

declare module '@tanstack/react-table' {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'submitted';
  }
}

export function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  return filterVariant === 'submitted' ? (
    <Select
      value={columnFilterValue?.toString()}
      onValueChange={() => {
        column.setFilterValue(() => {});
      }}
    >
      <SelectTrigger className="flex">
        <SelectValue placeholder={'Submitted'}>
          {'Submitted = ' + columnFilterValue}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={'__clear'}>Clear selection</SelectItem>
          <SelectItem value={'true'}>Submitted</SelectItem>
          <SelectItem value={'false'}>Draft</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ) : (
    <div />
  );
}
