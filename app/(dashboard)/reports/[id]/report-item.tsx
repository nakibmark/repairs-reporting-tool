import { TableRow } from '@/components/ui/table';
import { ReportItemWithNames } from '@/lib/data/reportItems';
import ReportItemCell from './report-item-cell';
import ReportItemCellMenu from './report-item-cell-menu';
import React from 'react';
import { deleteReportItem, saveReportItem } from './actions';

const ReportItem = ({ item }: { item: ReportItemWithNames }) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [editedItem, setEditedItem] = React.useState(item);

  const handleChange = (field: keyof ReportItemWithNames) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedItem({ ...editedItem, [field]: e.target.value });
  };

  return (
    <TableRow>
      <ReportItemCell onChange={handleChange('dateIn')} editState={isEditing} valueEdit={editedItem.dateIn?.toLocaleDateString('en-US') || ''} valueStatic={item.dateIn.toLocaleDateString('en-US')}></ReportItemCell>
      <ReportItemCell onChange={handleChange('brand')} editState={isEditing} valueEdit={editedItem.brand?.name || ''} valueStatic={item.brand.name}></ReportItemCell>
      <ReportItemCell onChange={handleChange('repairNo')} editState={isEditing} valueEdit={editedItem.repairNo || ''} valueStatic={item.repairNo}></ReportItemCell>
      <ReportItemCell onChange={handleChange('article')} editState={isEditing} valueEdit={editedItem.article || ''} valueStatic={item.article}></ReportItemCell>
      <ReportItemCell onChange={handleChange('serialNo')} editState={isEditing} valueEdit={editedItem.serialNo || ''} valueStatic={item.serialNo}></ReportItemCell>
      <ReportItemCell onChange={handleChange('warrantyType')} editState={isEditing} valueEdit={editedItem.warrantyType?.name || ''} valueStatic={item.warrantyType.name}></ReportItemCell>
      <ReportItemCell onChange={handleChange('serviceLevelType')} editState={isEditing} valueEdit={editedItem.serviceLevelType?.name || ''} valueStatic={item.serviceLevelType.name}></ReportItemCell>
      <ReportItemCell onChange={handleChange('dateOut')} editState={isEditing} valueEdit={editedItem.dateOut?.toLocaleDateString('en-US') || ''} valueStatic={item.dateOut ? item.dateOut.toLocaleDateString('en-US') : ''}></ReportItemCell>
      <ReportItemCell onChange={handleChange('comments')} editState={isEditing} valueEdit={editedItem.comments || ''} valueStatic={item.comments}></ReportItemCell>
      <ReportItemCellMenu
        isEditing={isEditing}
        handleEditClick={() => setIsEditing(true)}
        handleCancelClick={() => setIsEditing(false)}
        handleDeleteClick={async () => await deleteReportItem(item.id)}
        handleSaveClick={async () => await saveReportItem(editedItem)}>
      </ReportItemCellMenu>
    </TableRow>
  );
};

export default ReportItem;