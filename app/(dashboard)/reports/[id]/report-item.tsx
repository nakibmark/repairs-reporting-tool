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
import { ReportItemWithNames, editReportItem} from '@/lib/data/reportItems';

export const ReportItem = ({ item }: { item: ReportItemWithNames }) => {
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
              <form
                onSubmit={(event) => {
                event.preventDefault(); 
                const formData = new FormData(event.target);
                const id = formData.get("id");
                editReportItem(id);
                }}
              >
                <input type="hidden" name="id" value={item.id} />
                <button type="submit">Edit</button>
              </form>
            </DropdownMenuItem>
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
