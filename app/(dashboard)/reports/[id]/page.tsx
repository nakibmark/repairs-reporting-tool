import {
  getReportItemsWithNames,
} from '@/lib/data/reportItems';
import ReportItemsTable from './report-items-table';
import { fetchBrands, fetchServiceLevelTypes, fetchWarrantyTypes } from './actions';

export default async function ReportDetailsPage({
  params
}: {
  params: Promise<{ id: number }>;
}) {
  const brands = await fetchBrands();
  const serviceLevelTypes = await fetchServiceLevelTypes();
  const warrantyTypes = await fetchWarrantyTypes();
  const { id } = await params;
  const { items } = await getReportItemsWithNames(id);

  return <ReportItemsTable items={items} brands={brands} serviceLevelTypes={serviceLevelTypes} warrantyTypes={warrantyTypes} />;
}


