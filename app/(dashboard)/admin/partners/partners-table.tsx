'use client';

import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Partner from './partner';
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { SelectPartner } from '@/lib/schema';
import { Checkbox } from '@/components/ui/checkbox';
import PartnerSearch from './partner-search';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import DataTable from '@/components/data-table';
import { partnerColumns } from './partners-columns';
import { ColumnDef } from '@tanstack/react-table';

export type DropdownOption = { id: number; name: string };

const PartnersTable = ({
  partners,
  displayInactive,
}: {
  partners: SelectPartner[];
  displayInactive: boolean;
}) => {
  const [isCreatingNewItem, setIsCreatingNewPartner] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <div>
            <CardTitle>Manage Partners</CardTitle>
            <CardDescription>Edit partner details.</CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-2 space-x-2">
            <PartnerSearch />
            <div className="flex items-center gap-1">
              <Checkbox
                checked={displayInactive}
                id="displayInactive"
                onCheckedChange={() => {
                  const params = new URLSearchParams(searchParams);
                  if (displayInactive) params.delete('displayInactive');
                  else params.set('displayInactive', 'true');
                  params.delete('page');
                  replace(`${pathname}?${params.toString()}`);
                }}
              />
              <Label htmlFor="displayInactive">Display Inactive Partners</Label>
            </div>
            <Button
              type="button"
              onClick={() => setIsCreatingNewPartner(true)}
              size="sm"
              className="h-8 gap-1"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add partner
              </span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={partnerColumns as ColumnDef<SelectPartner>[]}
          data={partners}
          renderRow={(partner) => (
            <Partner
              key={partner.id}
              partner={partner}
              displayInactive={displayInactive}
            />
          )}
        />
        {isCreatingNewItem && (
          <Partner key={0} displayInactive={displayInactive} />
        )}
      </CardContent>
      <CardFooter />
    </Card>
  );
};

export default PartnersTable;
