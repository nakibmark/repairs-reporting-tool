import { Badge } from '@/components/ui/badge';

import { TableCell, TableRow } from '@/components/ui/table';
import { SelectReport } from '@/lib/schema';
import { useRouter } from 'next/navigation';
import RowActions from './row-actions';

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
        <RowActions report={report} />
      </TableCell>
    </TableRow>
  );
}
