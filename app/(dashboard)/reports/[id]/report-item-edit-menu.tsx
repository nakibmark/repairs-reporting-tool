"use client"

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

const ReportItemEditMenu = ({ isEditing, handleSaveClick, handleCancelClick, handleEditClick, handleDeleteClick }: { isEditing: boolean, handleEditClick: MouseEventHandler, handleSaveClick: MouseEventHandler, handleCancelClick: MouseEventHandler, handleDeleteClick: MouseEventHandler }) =>
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
          <DropdownMenuItem onClick={handleSaveClick}>
            Save
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCancelClick}>
            Cancel
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
          <DropdownMenuItem onClick={handleEditClick}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDeleteClick}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>

export default ReportItemEditMenu;