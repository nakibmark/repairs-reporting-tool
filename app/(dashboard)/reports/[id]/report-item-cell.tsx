import { TableCell} from '@/components/ui/table';
import { ReportItemWithNames} from '@/lib/data/reportItems';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import React from 'react';

type handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof ReportItemWithNames) => void;
type handleSaveClick = (item: ReportItemWithNames) => void;
type handleCancelClick = (id: string) => void;
type handleEditClick = (id: string, isEditing:boolean) => void;
type handleDeleteClick = (id: string) => void;

export const ReportItemCell = ({editState, handleChange, cellName, valueEdit, valueStatic}: {editState:boolean, handleChange:handleChange, cellName:string, valueEdit:string, valueStatic:(string | null)}) => {
  //dynamically render the reportItemCell depending on the state of the parent row
  if (editState){
    return(
      <TableCell className="hidden md:table-cell">
        <input
          value={valueEdit}
          onChange={(e) => handleChange(e, cellName as keyof ReportItemWithNames)}
        />
      </TableCell>
    )
  }else{
    return(
      <TableCell className="hidden md:table-cell">
        {valueStatic}     
      </TableCell>
    )
  }
}

export const ReportItemCellMenu = ({editState, handleSaveClick, handleCancelClick, handleEditClick, handleDeleteClick, editedItem, item}: {editState:boolean, handleSaveClick:handleSaveClick, handleCancelClick:handleCancelClick, handleEditClick:handleEditClick, handleDeleteClick:handleDeleteClick, editedItem:any, item:ReportItemWithNames}) => {
   //dynamically render the menu depending on the state of the parent row
   if(editState){
    return(
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
    );
   }else{
    return(
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
                  <button type="button" onClick={() => handleEditClick(item.id, editState)}>
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
    );
   }
}