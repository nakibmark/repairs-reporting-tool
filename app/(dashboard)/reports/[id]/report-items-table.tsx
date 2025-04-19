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
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ReportItem } from './report-item';
import { ReportItemWithNames } from '@/lib/data/reportItems';

export const ReportItemsTable = ({
  items
}: {
  items: ReportItemWithNames[];
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Report Details</CardTitle>
      <CardDescription>View your report details.</CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date Intervention In</TableHead>
            <TableHead>Maison</TableHead>
            <TableHead>Repair Number</TableHead>
            <TableHead>Article</TableHead>
            <TableHead>Serial Number</TableHead>
            <TableHead>Warranty Type</TableHead>
            <TableHead>Service Type</TableHead>
            <TableHead>Date Intervention Out</TableHead>
            <TableHead>Comments</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <ReportItem key={item.id} item={item} />
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);
