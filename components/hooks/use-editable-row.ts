'use client';

import { useState } from 'react';

export const useEditableRow = <T extends { id?: number | string }>(
  initialData: T | undefined,
  onSave: (data: T) => void
) => {
  const [isEditing, setIsEditing] = useState(!initialData);
  const [editedData, setEditedData] = useState<Partial<T> | undefined>(
    initialData
  );

  const handleEditClick = () => setIsEditing(true);

  const handleCancelClick = () => {
    setEditedData(initialData);
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    if (editedData) {
      onSave(editedData as T);
      setIsEditing(false);
    }
  };

  const onInputChange =
    (field: keyof T) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setEditedData(
        (prev) => ({ ...prev, [field]: e.target.value }) as Partial<T>
      );
    };

  const onDropdownChange = (field: keyof T) => (value: number) => {
    setEditedData((prev) => ({ ...prev, [field]: value }) as Partial<T>);
  };

  const onDateChange = (field: keyof T) => (date?: Date) => {
    setEditedData((prev) => ({ ...prev, [field]: date }) as Partial<T>);
  };

  return {
    isEditing,
    editedData,
    handleEditClick,
    handleCancelClick,
    handleSaveClick,
    onInputChange,
    onDropdownChange,
    onDateChange,
  };
};
