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
import ReportItem from './report-item';
import { ReportItemWithNames } from '@/lib/data/reportItems';

const ReportItemsTable = ({
  items, brands, serviceLevelTypes, warrantyTypes
}: {
  items: ReportItemWithNames[], brands: { id: number, name: string }[], serviceLevelTypes: { id: number, name: string }[], warrantyTypes: { id: number, name: string }[]
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
            <TableHead className="hidden md:table-cell">
              Date Intervention In
            </TableHead>
            <TableHead className="hidden md:table-cell">Maison</TableHead>
            <TableHead className="hidden md:table-cell">
              Repair Number
            </TableHead>
            <TableHead className="hidden md:table-cell">Article</TableHead>
            <TableHead className="hidden md:table-cell">
              Serial Number
            </TableHead>
            <TableHead className="hidden md:table-cell">
              Warranty Type
            </TableHead>
            <TableHead className="hidden md:table-cell">Service Type</TableHead>
            <TableHead className="hidden md:table-cell">
              Date Intervention Out
            </TableHead>
            <TableHead className="hidden md:table-cell">Comments</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <ReportItem key={item.id} item={item} brands={brands} serviceLevelTypes={serviceLevelTypes} warrantyTypes={warrantyTypes} />
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default ReportItemsTable;