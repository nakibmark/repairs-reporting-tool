import { findReportItemsWithNames } from '@/lib/data/reportItems';
import ReportItemsTable from './report-items-table';
import { getServiceLevelTypes } from '@/lib/data/serviceLevelTypes';
import { getBrands } from '@/lib/data/brands';
import { getWarrantyTypes } from '@/lib/data/warrantyTypes';
import { findReportStatusById } from '@/lib/data/reports';
import { cache } from 'react';

export default async function ReportDetailsPage({
  params,
}: {
  params: Promise<{ reportId: number }>;
}) {
  const getReportItems = cache(findReportItemsWithNames);
  const getReadOnlyStatus = cache(findReportStatusById);

  const { reportId } = await params;
  const brands = await getBrands();
  const serviceLevelTypes = await getServiceLevelTypes();
  const warrantyTypes = await getWarrantyTypes();
  const items = await getReportItems(reportId);
  const readOnly = await getReadOnlyStatus(reportId);

  return (
    <ReportItemsTable
      tableProps={{
        items,
        brands,
        serviceLevelTypes,
        warrantyTypes,
        readOnly,
        reportId,
      }}
    />
  );
}
