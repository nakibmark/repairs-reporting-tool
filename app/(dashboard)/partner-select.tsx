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
  <Select onValueChange={setActivePartner}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder={'Select a partner'}>
        {`${activeOption} - ${options.find((partner) => partner.id === Number(activeOption))?.name}`}
      </SelectValue>
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Partners</SelectLabel>
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
