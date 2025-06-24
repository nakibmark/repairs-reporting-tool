'use client';

import { TableRow } from '@/components/ui/table';
import { ReportItemWithNames } from '@/lib/data/reportItems';
import ReportItemCell from './report-item-cell';
import ReportItemEditMenu from './report-item-edit-menu';
import React from 'react';
import { deleteReportItem, saveReportItem } from './actions';
import ReportItemDropdown from './report-item-dropdown';
import ReportItemDatePicker from './report-item-date-picker';

const ReportItem = ({
  item,
  brands,
  serviceLevelTypes,
  warrantyTypes
}: {
  item: ReportItemWithNames;
  brands: { id: number; name: string }[];
  serviceLevelTypes: { id: number; name: string }[];
  warrantyTypes: { id: number; name: string }[];
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedItem, setEditedItem] = React.useState(item);

  const handleChange =
    (field: keyof ReportItemWithNames) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditedItem({ ...editedItem, [field]: e.target.value });
      };

  const findNameById = (id: number, items: { id: number; name: string }[]) =>
    items.find((item) => item.id === id)?.name || '';

  return (
    <TableRow>
      <ReportItemDatePicker
        onChange={(selectedDate: string) => {
          setEditedItem({ ...editedItem, dateIn: selectedDate });
        }}
        isEditing={isEditing}
        value={editedItem.dateIn}
      ></ReportItemDatePicker>
      <ReportItemDropdown
        isEditing={isEditing}
        currentValue={editedItem.brand?.name || ''}
        options={brands}
        onChange={(selectedId: string) => {
          setEditedItem({
            ...editedItem,
            brand: {
              id: Number(selectedId),
              name: findNameById(Number(selectedId), brands)
            }
          });
        }}
      ></ReportItemDropdown>
      <ReportItemCell
        onChange={handleChange('repairNo')}
        isEditing={isEditing}
        value={editedItem.repairNo || ''}
      ></ReportItemCell>
      <ReportItemCell
        onChange={handleChange('article')}
        isEditing={isEditing}
        value={editedItem.article || ''}
      ></ReportItemCell>
      <ReportItemCell
        onChange={handleChange('serialNo')}
        isEditing={isEditing}
        value={editedItem.serialNo || ''}
      ></ReportItemCell>
      <ReportItemDropdown
        isEditing={isEditing}
        currentValue={editedItem.warrantyType?.name || ''}
        options={warrantyTypes}
        onChange={(selectedId: string) => {
          setEditedItem({
            ...editedItem,
            warrantyType: {
              id: Number(selectedId),
              name: findNameById(Number(selectedId), warrantyTypes)
            }
          });
        }}
      ></ReportItemDropdown>
      <ReportItemDropdown
        isEditing={isEditing}
        currentValue={editedItem.serviceLevelType?.name || ''}
        options={serviceLevelTypes}
        onChange={(selectedId: string) => {
          setEditedItem({
            ...editedItem,
            serviceLevelType: {
              id: Number(selectedId),
              name: findNameById(Number(selectedId), warrantyTypes)
            }
          });
        }}
      ></ReportItemDropdown>
      <ReportItemDatePicker
        onChange={(selectedDate: string) => {
          setEditedItem({ ...editedItem, dateOut: selectedDate });
        }}
        isEditing={isEditing}
        value={editedItem.dateOut || undefined}
      ></ReportItemDatePicker>
      <ReportItemCell
        onChange={handleChange('comments')}
        isEditing={isEditing}
        value={editedItem.comments || ''}
      ></ReportItemCell>
      <ReportItemEditMenu
        isEditing={isEditing}
        handleEditClick={() => setIsEditing(true)}
        handleCancelClick={() => {
          setEditedItem(item);
          setIsEditing(false);
        }}
        handleDeleteClick={async () => await deleteReportItem(item.id)}
        handleSaveClick={async () => {
          await saveReportItem(editedItem);
          setIsEditing(false);
        }}
      ></ReportItemEditMenu>
    </TableRow>
  );
};

export default ReportItem;
