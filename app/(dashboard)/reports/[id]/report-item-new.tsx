
import { ReportItemWithNames } from '@/lib/data/reportItems';
import ReportItem from './report-item';
import React from 'react';
import { TableRow } from '@/components/ui/table';


const ReportItemNew = ({
  brands,
  serviceLevelTypes,
  warrantyTypes,
  reportId
}: {
  brands: { id: number; name: string }[];
  serviceLevelTypes: { id: number; name: string }[];
  warrantyTypes: { id: number; name: string }[];
  reportId: number
}) => {
  let newItem: ReportItemWithNames = {
    createdAt: new Date(),
    updatedAt: new Date(),
    dateIn: new Date().toDateString(),
    dateOut: null,
    reportId: reportId,
    id: "demo",
    repairNo: "Enter Repair#",
    article: "Enter Article#",
    serialNo: "Enter Serial#",
    comments: "Enter Comments",
    brand: { id: -1, name: "Pick Maison" },
    serviceLevelType: { id: -1, name: "Pick Service Type" },
    warrantyType: { id: -1, name: "Pick Warranty Type" },
  }
  return (
    <TableRow>
      <ReportItem item={newItem} brands={brands} serviceLevelTypes={serviceLevelTypes} warrantyTypes={warrantyTypes} />
    </TableRow>
  )
}
