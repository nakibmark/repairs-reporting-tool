import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { SelectReport } from '@/lib/schema';
import { deleteReportById, setReportStatus } from './actions';
import { useRouter } from 'next/navigation';

export function Report({ report }: { report: SelectReport }) {
  const router = useRouter();

  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => router.push(`/reports/${report.id}`)}
    >
      <TableCell className="hidden sm:table-cell" />
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
            <DropdownMenuItem
              onClick={(e) => {
                // Prevent the click event from propagating to the parent TableRow
                // which would trigger navigation to the report details page.
                e.stopPropagation();
                setReportStatus(report.id, !report.isSubmitted);
              }}
            >
              {report.isSubmitted ? 'Mark as Draft' : 'Submit'}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:bg-destructive/10 focus:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                deleteReportById(report.id);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
