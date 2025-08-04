'use client';

import { useState } from 'react';
import DisplayRow from './display-row';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type items = { id: number; name: string }[];

const BrandsContent = ({
  brands,
  serviceLevelTypes,
  warrantyTypes,
}: {
  brands: items;
  serviceLevelTypes: items;
  warrantyTypes: items;
}) => {
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editingItemCategory, setEditingItemCategory] = useState<string | null>(
    null
  );

  return (
    <CardContent>
      <div className="flex flex-col space-y-8">
        <div className="flex flex-row space-x-2 ml-auto mb-6">
          <Button disabled={!editingItemId} onClick={() => {}}>
            Delete
          </Button>
          <Button disabled={!editingItemId} onClick={() => {}}>
            Save
          </Button>
          <Button
            disabled={!editingItemId}
            onClick={() => {
              setEditingItemId(null);
            }}
          >
            Cancel
          </Button>
        </div>
        <DisplayRow
          items={brands}
          label={'Brands'}
          editingItemId={editingItemId}
          editingItemCategory={editingItemCategory}
          setEditingItemId={setEditingItemId}
          setEditingItemCategory={setEditingItemCategory}
        />
        <DisplayRow
          items={warrantyTypes}
          label={'Warranty Types'}
          editingItemId={editingItemId}
          editingItemCategory={editingItemCategory}
          setEditingItemId={setEditingItemId}
          setEditingItemCategory={setEditingItemCategory}
        />
        <DisplayRow
          items={serviceLevelTypes}
          label={'Service Types'}
          editingItemId={editingItemId}
          editingItemCategory={editingItemCategory}
          setEditingItemId={setEditingItemId}
          setEditingItemCategory={setEditingItemCategory}
        />
      </div>
    </CardContent>
  );
};

export default BrandsContent;
