import {
  getReportItemsWithNames,
  ReportItemWithNames
} from '@/lib/data/reportItems';
import { ReportItemsTable } from './report-items-table';

export default async function ReportDetailsPage({
  params
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const { items } = await getReportItemsWithNames(id);
  return <ReportItemsTable items={items} />;
}

export async function editItem({
  params
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const { items } = await getReportItemsWithNames(id);
  return <ReportItemsTable items={items} />;
}
