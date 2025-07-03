import { getReportItemsWithNames } from '@/lib/data/reportItems';
import ReportItemsTable from './report-items-table';
import { getServiceLevelTypes } from '@/lib/data/serviceLevelTypes';
import { getBrands } from '@/lib/data/brands';
import { getWarrantyTypes } from '@/lib/data/warrantyTypes';
import { getReportStatusById } from './actions';

export default async function ReportDetailsPage({
  params,
}: {
  params: Promise<{ reportId: number }>;
}) {
  const brands = await getBrands();
  const serviceLevelTypes = await getServiceLevelTypes();
  const warrantyTypes = await getWarrantyTypes();
  const { reportId } = await params;
  const { items } = await getReportItemsWithNames(reportId);
  const readOnly = await getReportStatusById(reportId);

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
