import { Badge } from '@/components/ui/badge';
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
import { SelectReport } from '@/lib/schema';
import Link from 'next/link';
import { deleteReportById } from './actions';

export function Report({ report }: { report: SelectReport }) {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell"></TableCell>
      <TableCell className="font-medium">{report.id}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {report.isSubmitted ? 'Submitted' : 'Draft'}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {report.reportMonth}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {report.reportYear}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {report.createdAt.toLocaleDateString('en-US')}
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
              <Link href={`/reports/${report.id}`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <button type="button" onClick={() => deleteReportById(report.id)}>Delete</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
