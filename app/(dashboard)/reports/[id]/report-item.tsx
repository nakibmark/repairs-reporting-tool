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
import { ReportItemWithNames } from '@/lib/data/reportItems';

export const ReportItem = ({ item }: { item: ReportItemWithNames }) => {
  return (
    <TableRow>
      <TableCell>{item.dateIn.toLocaleDateString('en-US')}</TableCell>
      <TableCell>{item.brand.name}</TableCell>
      <TableCell>{item.repairNo}</TableCell>
      <TableCell>{item.article}</TableCell>
      <TableCell>{item.serialNo}</TableCell>
      <TableCell>{item.warrantyType.name}</TableCell>
      <TableCell>{item.serviceLevelType.name}</TableCell>
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
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form action={() => {}}>
                <input type="hidden" name="id" value={item.id} />
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
