'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Report } from './report';
import { SelectReport } from '@/lib/schema';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ReportsTable({
  reports,
  offset,
  totalReports,
  submitted = null
}: {
  reports: SelectReport[];
  offset: number;
  totalReports: number;
  submitted: boolean | null;
}) {
  const router = useRouter();
  const reportsPerPage = 5;

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/reports/?offset=${offset}`, { scroll: false });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports</CardTitle>
        <CardDescription>View and manage your reports.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="hidden md:table-cell">Month</TableHead>
              <TableHead className="hidden md:table-cell">Year</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports
              .filter((report) =>
                submitted === null ? true : report.isSubmitted === submitted
              )
              .map((report) => (
                <Report key={report.id} report={report} />
              ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.max(0, Math.min(offset - reportsPerPage, totalReports) + 1)}
              -{offset}
            </strong>{' '}
            of <strong>{totalReports}</strong> reports
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === reportsPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + reportsPerPage > totalReports}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
