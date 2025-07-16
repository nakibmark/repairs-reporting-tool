'use client';

import { TableCell } from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import React, { MouseEventHandler } from 'react';

const PartnerEditMenu = ({
  isEditing,
  handleSaveClick,
  handleCancelClick,
  handleEditClick,
  handleDeleteClick,
}: {
  isEditing: boolean;
  handleEditClick: MouseEventHandler;
  handleSaveClick: MouseEventHandler;
  handleCancelClick: MouseEventHandler;
  handleDeleteClick: MouseEventHandler;
}) => (
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
        {isEditing ? (
          <>
            <DropdownMenuItem onClick={handleSaveClick}>Save</DropdownMenuItem>
            <DropdownMenuItem onClick={handleCancelClick}>
              Cancel
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem onClick={handleEditClick}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeleteClick}>
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  </TableCell>
);

export default PartnerEditMenu;
