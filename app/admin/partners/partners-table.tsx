'use client';

import { Label } from '@/components/ui/label';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Partner from './partner';
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { SelectPartner } from '@/lib/schema';
import { Checkbox } from '@/components/ui/checkbox';

export type DropdownOption = { id: number; name: string };

const PartnersTable = ({ partners }: { partners: SelectPartner[] }) => {
  const [isCreatingNewItem, setIsCreatingNewPartner] = useState(false);
  const [displayInactivePartners, setDisplayInactivePartners] = useState(false);
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <div>
            <CardTitle>Manage Partners</CardTitle>
            <CardDescription>Edit partner details.</CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-2 space-x-2">
            <div className="flex items-center ">
              <Checkbox
                checked={displayInactivePartners}
                id="displayInactive"
                onCheckedChange={() => {
                  setDisplayInactivePartners(!displayInactivePartners);
                }}
              ></Checkbox>
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:table-cell">ID</TableHead>
              <TableHead className="hidden md:table-cell">Name</TableHead>
              <TableHead className="hidden md:table-cell">Number</TableHead>
              <TableHead className="hidden md:table-cell">
                Email Address
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Phone Number
              </TableHead>
              <TableHead className="hidden md:table-cell">City</TableHead>
              <TableHead className="hidden md:table-cell">State</TableHead>
              <TableHead className="hidden md:table-cell">Country</TableHead>
              <TableHead className="hidden md:table-cell">Market</TableHead>
              <TableHead className="hidden md:table-cell">Region</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isCreatingNewItem && <Partner key={0} />}
            {partners.map((partner) => (
              <Partner key={partner.id} partner={partner} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PartnersTable;
