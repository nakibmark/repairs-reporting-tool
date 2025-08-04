'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const DisplayFlexBox = ({
  items,
  label,
}: {
  items: { id: number; name: string }[];
  label: string;
}) => {
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editedItemName, setEditedItemName] = useState('');

  const handleItemClick = (item: { id: number; name: string }) => {
    setEditingItemId(item.id);
    setEditedItemName(item.name);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedItemName(e.target.value);
  };

  const handleInputBlur = (item: { id: number; name: string }) => {
    console.log(`Updating item ${item.id} to ${editedItemName}`);
    setEditingItemId(null);
  };
  return (
    <div className="flex flex-row space-x-2">
      <div className="font-bold mb-2 w-48">{label}</div>
      {items.map((item) => (
        <div key={item.id}>
          {editingItemId === item.id ? (
            <Input
              type="text"
              value={editedItemName}
              onChange={handleInputChange}
              onBlur={() => handleInputBlur(item)}
              autoFocus
              className="w-fit"
            />
          ) : (
            <div
              className="py-2 px-4 border rounded-md shadow-sm w-fit cursor-pointer"
              onClick={() => handleItemClick(item)}
            >
              {item.name}
            </div>
          )}
        </div>
      ))}
      <Button>Add {label}</Button>
    </div>
  );
};

export default DisplayFlexBox;
