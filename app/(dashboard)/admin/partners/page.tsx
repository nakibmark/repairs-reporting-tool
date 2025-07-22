import { findPartners } from '@/lib/data/partners';
import PartnersTable from './partners-table';
import { SearchParams } from 'next/dist/server/request/search-params';
import { flattenSearchParams } from 'app/utils/flattenSearchParams';

export default async function PartnersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const {
    query = '',
    page = '1',
    size = '10',
    displayInactive = false,
  } = await searchParams.then(flattenSearchParams);

  const { partners, totalPages } = await findPartners({
    currentPage: +page,
    limit: +size,
    displayInactive: !!displayInactive,
    query,
  });

  return (
    <PartnersTable
      partners={partners}
      displayInactive={!!displayInactive}
      totalPages={totalPages}
    />
  );
}
