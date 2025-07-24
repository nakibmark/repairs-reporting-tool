'use client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const FilterSelect = ({
  options,
  filterName,
  activeFilter,
}: {
  options: { id: number; name: string }[];
  filterName: string;
  activeFilter?: string;
}) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <Select
      value={activeFilter}
      onValueChange={(value) => {
        const params = new URLSearchParams(searchParams);
        if (value === '__clear') {
          // hacky workaround for radix-ui not allowing "" as a select value as of 2025-07-21
          // https://github.com/radix-ui/primitives/issues/2706
          params.delete(filterName.toLowerCase());
        } else {
          params.set(
            filterName.toLowerCase(),
            String(options.find((filter) => filter.id === Number(value))?.name)
          );
        }
        replace(`${pathname}?${params.toString()}`, { scroll: false });
      }}
    >
      <SelectTrigger className="flex">
        <SelectValue placeholder={filterName}>
          {!!activeFilter
            ? `${filterName} = ${options.find((filter) => filter.name === searchParams.get(filterName.toLowerCase()))?.name}`
            : filterName}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem key={'__clear'} value={'__clear'}>
            {/*
             * hacky workaround for radix-ui not allowing "" as a select value as of 2025-07-21
             * https://github.com/radix-ui/primitives/issues/2706
             */}
            Clear selection
          </SelectItem>
          {options.map((filter) => (
            <SelectItem key={filter.id} value={String(filter.id)}>
              {`${filter.id} - ${filter.name}`}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FilterSelect;
