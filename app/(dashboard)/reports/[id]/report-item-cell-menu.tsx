import { TableCell } from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import React, { MouseEventHandler } from 'react';

const ReportItemCellMenu = ({ isEditing, handleSaveClick, handleCancelClick, handleEditClick, handleDeleteClick }: { handleEditClick: MouseEventHandler, isEditing: boolean, handleSaveClick: MouseEventHandler, handleCancelClick: MouseEventHandler, handleDeleteClick: MouseEventHandler }) =>
  isEditing ?
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
              <button type="button" onClick={handleSaveClick}>
                Save
              </button>
            </form>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <form>
              <button type="button" onClick={handleCancelClick}>
                Cancel
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
    :
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
              <button type="button" onClick={handleEditClick}>
                Edit
              </button>
            </form>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <form>
              <button type="button" onClick={handleDeleteClick}>
                Delete
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>

export default ReportItemCellMenu;