"use client"

import { TableRow } from '@/components/ui/table';
import { ReportItemWithNames } from '@/lib/data/reportItems';
import ReportItemCell from './report-item-cell';
import ReportItemEditMenu from './report-item-edit-menu';
import React from 'react';
import { deleteReportItem, saveReportItem } from './actions';

const ReportItem = ({ item }: { item: ReportItemWithNames }) => {
  console.log(item)
  const [isEditing, setIsEditing] = React.useState(false)
  const [editedItem, setEditedItem] = React.useState(item);

  const handleChange = (field: keyof ReportItemWithNames) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedItem({ ...editedItem, [field]: e.target.value });
  };

  return (
    <TableRow>
      <ReportItemCell onChange={handleChange('dateIn')} isEditing={isEditing} value={editedItem.dateIn?.toLocaleDateString('en-US') || ''}></ReportItemCell>
      <ReportItemCell onChange={handleChange('brand')} isEditing={isEditing} value={editedItem.brand?.name || ''} ></ReportItemCell>
      <ReportItemCell onChange={handleChange('repairNo')} isEditing={isEditing} value={editedItem.repairNo || ''} ></ReportItemCell>
      <ReportItemCell onChange={handleChange('article')} isEditing={isEditing} value={editedItem.article || ''} ></ReportItemCell>
      <ReportItemCell onChange={handleChange('serialNo')} isEditing={isEditing} value={editedItem.serialNo || ''} ></ReportItemCell>
      <ReportItemCell onChange={handleChange('warrantyType')} isEditing={isEditing} value={editedItem.warrantyType?.name || ''} ></ReportItemCell>
      <ReportItemCell onChange={handleChange('serviceLevelType')} isEditing={isEditing} value={editedItem.serviceLevelType?.name || ''} ></ReportItemCell>
      <ReportItemCell onChange={handleChange('dateOut')} isEditing={isEditing} value={editedItem.dateOut?.toLocaleDateString('en-US') || ''} ></ReportItemCell>
      <ReportItemCell onChange={handleChange('comments')} isEditing={isEditing} value={editedItem.comments || ''} ></ReportItemCell>
      <ReportItemEditMenu
        isEditing={isEditing}
        handleEditClick={() => setIsEditing(true)}
        handleCancelClick={() => {
          setEditedItem(item)
          setIsEditing(false)
        }}
        handleDeleteClick={async () => await deleteReportItem(item.id)}
        handleSaveClick={async () => {
          await saveReportItem(editedItem)
          setIsEditing(false)
        }}>
      </ReportItemEditMenu>
    </TableRow>
  );
};

export default ReportItem;