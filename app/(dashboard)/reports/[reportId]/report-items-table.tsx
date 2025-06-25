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
  CardTitle,
  CardAction
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
      <CardAction>
        <Button type="button" onClick={() => { console.log("Add report item clicked") }}>Add Report Item</Button>
      </CardAction>
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