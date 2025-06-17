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
import {deleteReportItem, editReportItem} from "./actions";

export const ReportItem = ({ item }: { item: ReportItemWithNames }) => {
  let isEditing: boolean = true;
  if(isEditing){
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
                  <button type="button" onClick={() => handleSaveClick(item)}>
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
  }else{
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
    );
  }
};
async function handleDeleteClick(id: string){
  await deleteReportItem(id);
}
async function handleEditClick(id: string){
  await editReportItem(id);
}
async function handleSaveClick(Item: ReportItemWithNames){

}
async function handleCancelClick(id: string){

}
