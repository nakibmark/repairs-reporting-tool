import { getPartners, getTotalPages, searchPartners } from './actions';
import PartnersTable from './partners-table';

export default async function PartnersPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    displayInactive?: string;
    partnersPerPage?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const displayInactive = searchParams?.displayInactive === 'true' || false;
  const partnersPerPage = Number(searchParams?.partnersPerPage) || 10;
  const partners = query
    ? await searchPartners(query, currentPage, displayInactive, partnersPerPage)
    : await getPartners(currentPage, displayInactive, partnersPerPage);
  const totalPages = await getTotalPages(
    partnersPerPage,
    query,
    displayInactive
  );
  return (
    <PartnersTable
      partners={partners}
      displayInactive={displayInactive}
      totalPages={totalPages}
    />
  );
}
