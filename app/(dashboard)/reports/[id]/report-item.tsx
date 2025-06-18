import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { ReportItemWithNames} from '@/lib/data/reportItems';
import {deleteReportItem, editReportItem, saveReportItem, cancelEditReportItem} from "./actions";
import { ReportItemCell, ReportItemCellMenu } from './report-item-cell';
import React from 'react';


export const ReportItem = ({ item }: { item: ReportItemWithNames }) => {
  let isEditing: boolean = false;  
  const [editedItem, setEditedItem] = React.useState(item);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof ReportItemWithNames) => {
    setEditedItem({ ...editedItem, [field]: e.target.value });
  };
    return (
      <TableRow>
        <ReportItemCell handleChange={handleChange} editState={isEditing} cellName='dateIn' valueEdit={editedItem.dateIn?.toLocaleDateString('en-US') || ''} valueStatic={item.dateIn.toLocaleDateString('en-US')}></ReportItemCell>
        <ReportItemCell handleChange={handleChange} editState={isEditing} cellName='brand' valueEdit={editedItem.brand?.name || ''} valueStatic={item.brand.name}></ReportItemCell>
        <ReportItemCell handleChange={handleChange} editState={isEditing} cellName='repairNo' valueEdit={editedItem.repairNo || ''} valueStatic={item.repairNo}></ReportItemCell>
        <ReportItemCell handleChange={handleChange} editState={isEditing} cellName='article' valueEdit={editedItem.article || ''} valueStatic={item.article}></ReportItemCell>
        <ReportItemCell handleChange={handleChange} editState={isEditing} cellName='serialNo' valueEdit={editedItem.serialNo || ''} valueStatic={item.serialNo}></ReportItemCell>
        <ReportItemCell handleChange={handleChange} editState={isEditing} cellName='warrantyType' valueEdit={editedItem.warrantyType?.name || ''} valueStatic={item.warrantyType.name}></ReportItemCell>
        <ReportItemCell handleChange={handleChange} editState={isEditing} cellName='serviceLevelType' valueEdit={editedItem.serviceLevelType?.name || ''} valueStatic={item.serviceLevelType.name}></ReportItemCell>
        <ReportItemCell handleChange={handleChange} editState={isEditing} cellName='dateOut' valueEdit={editedItem.dateOut?.toLocaleDateString('en-US') || ''} valueStatic={item.dateOut ? item.dateOut.toLocaleDateString('en-US') : ''}></ReportItemCell>
        <ReportItemCell handleChange={handleChange} editState={isEditing} cellName='comments' valueEdit={editedItem.comments || ''} valueStatic={item.comments}></ReportItemCell>
        <ReportItemCellMenu editState={isEditing} handleDeleteClick={handleDeleteClick} handleCancelClick={handleCancelClick} handleEditClick={handleEditClick} handleSaveClick={handleSaveClick} item={item} editedItem={editedItem}></ReportItemCellMenu>
      </TableRow>
    );
};
async function handleDeleteClick(id: string){
  await deleteReportItem(id);
}
async function handleEditClick(id: string, isEditing:boolean){
  isEditing = true;
  await editReportItem(id);
}
async function handleSaveClick(item: ReportItemWithNames){
  await saveReportItem(item);
}
async function handleCancelClick(id: string){
  await cancelEditReportItem(id);
}
