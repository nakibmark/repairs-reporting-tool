import { findPartners } from '@/lib/data/partners';
import PartnersTable from './partners-table';
import { SearchParams } from 'next/dist/server/request/search-params';
import { flattenSearchParams } from 'app/utils/flattenSearchParams';

export default async function PartnersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { query = '', displayInactive = false } =
    await searchParams.then(flattenSearchParams);

  const { partners } = await findPartners({
    displayInactive: !!displayInactive,
    query,
  });

  return (
    <PartnersTable partners={partners} displayInactive={!!displayInactive} />
  );
}
