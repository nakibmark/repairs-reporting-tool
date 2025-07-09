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
import { Input } from '@/components/ui/input';
import { getPartners, searchPartners } from './actions';
import { Search } from 'lucide-react';

export type DropdownOption = { id: number; name: string };

const PartnersTable = ({ partnersProp }: { partnersProp: SelectPartner[] }) => {
  const [isCreatingNewItem, setIsCreatingNewPartner] = useState(false);
  const [displayInactivePartners, setDisplayInactivePartners] = useState(false);
  const [partners, setPartners] = useState(partnersProp);

  async function handleSearchClick(formData: FormData) {
    setPartners(
      String(formData.get('searchInput'))
        ? await searchPartners(String(formData.get('searchInput')))
        : await getPartners()
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <div>
            <CardTitle>Manage Partners</CardTitle>
            <CardDescription>Edit partner details.</CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-2 space-x-2">
            <form
              className="relative ml-auto flex md:grow-0 items-center"
              action={handleSearchClick}
            >
              <Search className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
              <Input
                size={15}
                name="searchInput"
                type="text"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              ></Input>
              <Button size="sm" type="submit">
                Search
              </Button>
            </form>
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
            {isCreatingNewItem && (
              <Partner key={0} displayInactive={displayInactivePartners} />
            )}
            {partners.map((partner) => (
              <Partner
                key={partner.id}
                partner={partner}
                displayInactive={displayInactivePartners}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PartnersTable;
