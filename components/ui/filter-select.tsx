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
  activeOption,
  filterName,
}: {
  options: { id: number; name: string }[];
  filterName: string;
  activeOption?: string;
}) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  return (
    <Select
      value={activeOption}
      onValueChange={(value) => {
        if (value === '__clear') {
          // hacky workaround for radix-ui not allowing "" as a select value as of 2025-07-21
          // https://github.com/radix-ui/primitives/issues/2706
          const params = new URLSearchParams(searchParams);
          params.delete(filterName);
        } else {
          params.set(
            filterName,
            String(options.find((filter) => filter.id === Number(value))?.name)
          );
        }
        replace(`${pathname}?${params.toString()}`, { scroll: false });
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={filterName}>
          {`${filterName} = ${options.find((filter) => filter.id === Number(activeOption))?.name}`}
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
