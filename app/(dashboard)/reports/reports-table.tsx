'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Report } from './report';
import { SelectReport } from '@/lib/schema';
import Pagination from '@/components/ui/pagination';

export const ReportsTable = ({
  reports,
  totalPages,
}: {
  reports: SelectReport[];
  totalPages: number;
}) => (
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
          {reports.map((report) => (
            <Report key={report.id} report={report} />
          ))}
        </TableBody>
      </Table>
    </CardContent>
    <CardFooter>
      <Pagination totalPages={totalPages} />
    </CardFooter>
  </Card>
);
