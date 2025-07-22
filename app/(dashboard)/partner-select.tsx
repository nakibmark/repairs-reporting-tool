'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { setActivePartner } from './actions';

const PartnerSelect = ({
  options,
  activeOption,
}: {
  options: { id: number; name: string }[];
  activeOption?: string;
}) => (
  <Select value={activeOption} onValueChange={setActivePartner}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder={'Select a partner'}>
        {`${activeOption} - ${options.find((partner) => partner.id === Number(activeOption))?.name}`}
      </SelectValue>
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Partners</SelectLabel>
        <SelectItem key={'__clear'} value={'__clear'}>
          {/*
           * hacky workaround for radix-ui not allowing "" as a select value as of 2025-07-21
           * https://github.com/radix-ui/primitives/issues/2706
           */}
          Clear selection
        </SelectItem>
        {options.map((partner) => (
          <SelectItem key={partner.id} value={String(partner.id)}>
            {`${partner.id} - ${partner.name}`}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

export default PartnerSelect;
