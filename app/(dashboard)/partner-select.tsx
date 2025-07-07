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
import { getPartners, setActivePartner } from './actions';

const PartnerSelect = ({
  partners,
  activePartner,
}: {
  partners: Awaited<ReturnType<typeof getPartners>>;
  activePartner?: string;
}) => (
  <Select onValueChange={setActivePartner}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder={'Select a partner'}>
        {`${activePartner} - ${partners.find((partner) => partner.id === Number(activePartner))?.name}`}
      </SelectValue>
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Partners</SelectLabel>
        {partners.map((partner) => (
          <SelectItem key={partner.id} value={String(partner.id)}>
            {`${partner.id} - ${partner.name}`}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

export default PartnerSelect;
