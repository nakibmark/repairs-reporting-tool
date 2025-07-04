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
import { getPartners } from './actions';

const PartnerSelect = ({
  partners,
  activePartner,
}: {
  partners: Awaited<ReturnType<typeof getPartners>>;
  activePartner?: string;
}) => (
  <Select>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder={'Select a partner'}>
        {activePartner}
      </SelectValue>
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Partners</SelectLabel>
        {partners.map((partner) => (
          <SelectItem key={partner.id} value={partner.name}>
            {partner.name}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

export default PartnerSelect;
