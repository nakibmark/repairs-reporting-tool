import { getPartners, searchPartners } from './actions';
import PartnersTable from './partners-table';

export default async function PartnersPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    displayInactive?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const displayInactive = searchParams?.displayInactive === 'true' || false;
  const partners = query
    ? await searchPartners(query, currentPage, displayInactive)
    : await getPartners(currentPage, displayInactive);
  return (
    <PartnersTable partners={partners} displayInactive={displayInactive} />
  );
}
