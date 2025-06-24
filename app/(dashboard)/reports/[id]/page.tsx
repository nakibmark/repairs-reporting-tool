import {
  getReportItemsWithNames,
} from '@/lib/data/reportItems';
import ReportItemsTable from './report-items-table';
import { getServiceLevelTypes } from '@/lib/data/serviceLevelTypes';
import { getBrands } from '@/lib/data/brands';
import { getWarrantyTypes } from '@/lib/data/warrantyTypes';

export default async function ReportDetailsPage({
  params
}: {
  params: Promise<{ id: number }>;
}) {
  const brands = await getBrands();
  const serviceLevelTypes = await getServiceLevelTypes();
  const warrantyTypes = await getWarrantyTypes();
  const { id } = await params;
  const { items } = await getReportItemsWithNames(id);

  return <ReportItemsTable items={items} brands={brands} serviceLevelTypes={serviceLevelTypes} warrantyTypes={warrantyTypes} />;
}


