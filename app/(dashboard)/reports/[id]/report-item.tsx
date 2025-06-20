"use client"

import { TableRow } from '@/components/ui/table';
import { ReportItemWithNames } from '@/lib/data/reportItems';
import ReportItemCell from './report-item-cell';
import ReportItemEditMenu from './report-item-edit-menu';
import React from 'react';
import { deleteReportItem, saveReportItem } from './actions';
import ReportItemDropdown from './report-item-dropdown';

const ReportItem = ({ item, brands, serviceLevelTypes, warrantyTypes }:
  { item: ReportItemWithNames, brands: { id: number, name: string }[], serviceLevelTypes: { id: number, name: string }[], warrantyTypes: { id: number, name: string }[] }) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [editedItem, setEditedItem] = React.useState(item);

  const handleChange = (field: keyof ReportItemWithNames) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedItem({ ...editedItem, [field]: e.target.value });
  };
  const findBrandByID = (id: number): string => {
    return brands.find(brand => brand.id === id)?.name || ""
  }
  const findServiceByID = (id: number): string => {
    return serviceLevelTypes.find(serviceLevelType => serviceLevelType.id === id)?.name || ""
  }
  const findWarrantyByID = (id: number): string => {
    return warrantyTypes.find(warrantyType => warrantyType.id === id)?.name || ""
  }


  return (
    <TableRow>
      <ReportItemCell onChange={handleChange('dateIn')} isEditing={isEditing} value={editedItem.dateIn?.toLocaleDateString('en-US') || ''}></ReportItemCell>
      <ReportItemDropdown isEditing={isEditing} currentValue={editedItem.brand?.name || ''} options={brands}
        onChange={(selectedId: string) => { setEditedItem({ ...editedItem, brand: { id: Number(selectedId), name: findBrandByID(Number(selectedId)) } }) }}>

      </ReportItemDropdown>
      <ReportItemCell onChange={handleChange('repairNo')} isEditing={isEditing} value={editedItem.repairNo || ''} ></ReportItemCell>
      <ReportItemCell onChange={handleChange('article')} isEditing={isEditing} value={editedItem.article || ''} ></ReportItemCell>
      <ReportItemCell onChange={handleChange('serialNo')} isEditing={isEditing} value={editedItem.serialNo || ''} ></ReportItemCell>
      <ReportItemDropdown isEditing={isEditing} currentValue={editedItem.warrantyType?.name || ''} options={warrantyTypes}
        onChange={(selectedId: string) => { setEditedItem({ ...editedItem, warrantyType: { id: Number(selectedId), name: findWarrantyByID(Number(selectedId)) } }) }}>
      </ReportItemDropdown>
      <ReportItemDropdown isEditing={isEditing} currentValue={editedItem.serviceLevelType?.name || ''} options={serviceLevelTypes}
        onChange={(selectedId: string) => { setEditedItem({ ...editedItem, serviceLevelType: { id: Number(selectedId), name: findServiceByID(Number(selectedId)) } }) }}>
      </ReportItemDropdown>
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