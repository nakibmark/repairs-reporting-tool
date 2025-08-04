'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const DisplayRow = ({
  items,
  label,
  editingItemId,
  editingItemCategory,
  setEditingItemId,
  setEditingItemCategory,
}: {
  items: { id: number; name: string }[];
  label: string;
  editingItemId: number | null;
  editingItemCategory: string | null;
  setEditingItemId: (id: number | null) => void;
  setEditingItemCategory: (category: string | null) => void;
}) => {
  const [editedItemName, setEditedItemName] = useState('');
  const [isCreatingNewItem, setIsCreatingNewItem] = useState(false);

  const handleItemClick = (item: { id: number; name: string }) => {
    setEditingItemId(item.id);
    setEditingItemCategory(label);
    setEditedItemName(item.name);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedItemName(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row space-x-2">
        <div className="font-bold mb-2 w-40">{label}</div>
        {items.map((item) => (
          <div key={item.id}>
            {editingItemId === item.id && editingItemCategory === label ? (
              <Input
                type="text"
                value={editedItemName}
                onChange={handleInputChange}
                autoFocus
                className="w-fit"
              />
            ) : (
              <div
                className="py-2 px-2 border rounded-md shadow-sm w-fit cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                {item.name}
              </div>
            )}
          </div>
        ))}
        {isCreatingNewItem && (
          <Input
            type="text"
            value={''}
            onChange={handleInputChange}
            autoFocus
            className="py-2 px-2 border rounded-md shadow-sm w-fit cursor-pointer"
          />
        )}
        <Button
          className="ml-auto"
          onClick={() => {
            setIsCreatingNewItem(true);
          }}
        >
          Add {label}
        </Button>
      </div>
    </div>
  );
};

export default DisplayRow;
