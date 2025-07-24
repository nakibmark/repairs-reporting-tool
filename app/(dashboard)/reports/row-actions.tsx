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
import { MouseEventHandler, useCallback } from 'react';
import { deleteReportById, setReportStatus } from './actions';
import { SelectReport } from '@/lib/schema';

const RowActions = ({ report }: { report: SelectReport }) => {
  const onToggleReportStatus: MouseEventHandler = useCallback(
    (e) => {
      // Prevent the click event from propagating to the parent TableRow
      // which would trigger navigation to the report details page.
      e.stopPropagation();
      setReportStatus(report.id, !report.isSubmitted);
    },
    [report]
  );

  const onDelete: MouseEventHandler = useCallback(
    (e) => {
      e.stopPropagation();
      deleteReportById(report.id);
    },
    [report]
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={onToggleReportStatus}>
          {report.isSubmitted ? 'Mark as Draft' : 'Submit'}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:bg-destructive/10 focus:text-destructive"
          onClick={onDelete}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RowActions;
