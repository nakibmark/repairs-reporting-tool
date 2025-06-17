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
import { ReportItemCell } from './report-item-cell';
import React from 'react';


export const ReportItem = ({ item }: { item: ReportItemWithNames }) => {
  let isEditing: boolean = false;  
  const [editedItem, setEditedItem] = React.useState(item);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof ReportItemWithNames) => {
    setEditedItem({ ...editedItem, [field]: e.target.value });
  };
    return (
      <TableRow>
        <ReportItemCell handleChange={handleChange} editedItem={editedItem} editState={isEditing} cellName='dateIn' item={item}></ReportItemCell>
        <TableCell className="hidden md:table-cell">
          <input
            type="text"
            value={editedItem.brand?.name || ''}
            onChange={(e) => handleChange(e, 'brand')}
          />
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <input
            type="text"
            value={editedItem.repairNo || ''}
            onChange={(e) => handleChange(e, 'repairNo')}
          />
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <input
            type="text"
            value={editedItem.article || ''}
            onChange={(e) => handleChange(e, 'article')}
          />
        </TableCell>
        <TableCell className="hidden max-w-64 md:table-cell truncate">
          <input
            type="text"
            value={editedItem.serialNo || ''}
            onChange={(e) => handleChange(e, 'serialNo')}
          />
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <input
            type="text"
            value={editedItem.warrantyType?.name || ''}
            onChange={(e) => handleChange(e, 'warrantyType')}
          />
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <input
            type="text"
            value={editedItem.serviceLevelType?.name || ''}
            onChange={(e) => handleChange(e, 'serviceLevelType')}
          />
        </TableCell>
        <TableCell>
          <input
            type="text"
            value={editedItem.dateOut?.toLocaleDateString('en-US') || ''}
            onChange={(e) => handleChange(e, 'dateOut')}
          />
        </TableCell>
        <TableCell>
          <textarea
            value={editedItem.comments || ''}
            onChange={(e) => handleChange(e, 'comments')}
          />
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <form>
                  <button type="button" onClick={() => handleSaveClick(editedItem)}>
                    Save
                  </button>
                </form>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <form>
                  <button type="button" onClick={() => handleCancelClick(item.id)}>
                    Cancel
                  </button>
                </form>
              </DropdownMenuItem> 
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
     </TableRow>
    );
  /*
    return (
      <TableRow>
        <TableCell className="hidden md:table-cell">
          {item.dateIn.toLocaleDateString('en-US')}
        </TableCell>
        <TableCell className="hidden md:table-cell">{item.brand.name}</TableCell>
        <TableCell className="hidden md:table-cell">{item.repairNo}</TableCell>
        <TableCell className="hidden md:table-cell">{item.article}</TableCell>
        <TableCell className="hidden max-w-64 md:table-cell truncate">
          {item.serialNo}
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {item.warrantyType.name}
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {item.serviceLevelType.name}
        </TableCell>
        <TableCell>
          {item.dateOut ? item.dateOut.toLocaleDateString('en-US') : ''}
        </TableCell>
        <TableCell>{item.comments}</TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <form>
                  <button type="button" onClick={() => handleEditClick(item.id)}>
                    Edit
                  </button>
                </form>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <form>
                  <button type="button" onClick={() => handleDeleteClick(item.id)}>
                    Delete
                  </button>
                </form>
              </DropdownMenuItem> 
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
     </TableRow>
    );*/
};
async function handleDeleteClick(id: string){
  await deleteReportItem(id);
}
async function handleEditClick(id: string){
  await editReportItem(id);

}
async function handleSaveClick(item: ReportItemWithNames){
  await saveReportItem(item);
}
async function handleCancelClick(id: string){
  await cancelEditReportItem(id);
}
