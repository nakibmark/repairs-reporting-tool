import { findReportItemsWithNames } from '@/lib/data/reportItems';
import ReportItemsTable from './report-items-table';
import { getServiceLevelTypes } from '@/lib/data/serviceLevelTypes';
import { getBrands } from '@/lib/data/brands';
import { getWarrantyTypes } from '@/lib/data/warrantyTypes';
import { cache } from 'react';

export default async function ReportDetailsPage({
  params,
}: {
  params: Promise<{ reportId: number }>;
}) {
  const getReportItems = cache(findReportItemsWithNames);

  const { reportId } = await params;
  const brands = await getBrands();
  const serviceLevelTypes = await getServiceLevelTypes();
  const warrantyTypes = await getWarrantyTypes();
  const items = await getReportItems(reportId);

  return (
    <ReportItemsTable
      reportItems={items}
      reportId={reportId}
      dropdownOptions={{
        brandOptions: brands,
        serviceLevelTypeOptions: serviceLevelTypes,
        warrantyTypeOptions: warrantyTypes,
      }}
    />
  );
}
