import { selectReportItemsByReportId } from '@/lib/data/reportItems';
import ReportItemsTable from './report-items-table';
import { cache } from 'react';

export default async function ReportDetailsPage({
  params,
}: {
  params: Promise<{ reportId: number }>;
}) {
  const getReportItems = cache(selectReportItemsByReportId);

  const { reportId } = await params;
  const items = await getReportItems(reportId);

  return <ReportItemsTable reportItems={items} />;
}
