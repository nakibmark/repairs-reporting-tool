"use client"

import { TableRow } from '@/components/ui/table';
import { ReportItemWithNames } from '@/lib/data/reportItems';
import ReportItemCell from './report-item-cell';
import ReportItemEditMenu from './report-item-edit-menu';
import React, { Suspense } from 'react';
import { deleteReportItem, fetchBrands, saveReportItem } from './actions';
import ReportItemDropdown from './report-item-dropdown';

const ReportItem = ({ item, brands, serviceLevelTypes, warrantyTypes }:
  { item: ReportItemWithNames, brands: any, serviceLevelTypes: any, warrantyTypes: any }) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [editedItem, setEditedItem] = React.useState(item);

  const handleChange = (field: keyof ReportItemWithNames) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedItem({ ...editedItem, [field]: e.target.value });
  };



  return (
    <TableRow>
      <ReportItemCell onChange={handleChange('dateIn')} isEditing={isEditing} value={editedItem.dateIn?.toLocaleDateString('en-US') || ''}></ReportItemCell>
      <ReportItemDropdown isEditing={isEditing} currentValue={editedItem.brand?.name || ''} options={brands} onChange={() => { }}></ReportItemDropdown>
      <ReportItemCell onChange={handleChange('repairNo')} isEditing={isEditing} value={editedItem.repairNo || ''} ></ReportItemCell>
      <ReportItemCell onChange={handleChange('article')} isEditing={isEditing} value={editedItem.article || ''} ></ReportItemCell>
      <ReportItemCell onChange={handleChange('serialNo')} isEditing={isEditing} value={editedItem.serialNo || ''} ></ReportItemCell>
      <ReportItemDropdown isEditing={isEditing} currentValue={editedItem.warrantyType?.name || ''} options={warrantyTypes} onChange={() => { }}></ReportItemDropdown>
      <ReportItemDropdown isEditing={isEditing} currentValue={editedItem.serviceLevelType?.name || ''} options={serviceLevelTypes} onChange={() => { }}></ReportItemDropdown>
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